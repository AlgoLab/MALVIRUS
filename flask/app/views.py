import subprocess
from subprocess import Popen
from flask import render_template, jsonify, request, abort, make_response
from app import app
from werkzeug.utils import secure_filename

from os.path import join as pjoin
from pathlib import Path
from os import getcwd
import os

from uuid import uuid4
import json
from time import sleep
import datetime
import glob
import shutil


def mkdirp(path):
    Path(path).mkdir(parents=True, exist_ok=True)


@app.route('/')
def home():
    return render_template('home.html')


@app.route('/snakemake')
def snakemake():
    p = subprocess.run(
        ["/bin/bash", "-c", "-l", "snakemake -v"],
        capture_output=True,
        text=True
    )
    return p.stdout


@app.route('/<path:route>')
def not_found(route):
    return 'Route ' + route + ' not found!', 404


@app.route('/vcf', methods=['GET'])
def get_vcf_list():
    vcfs = list()
    for folder in glob.glob(pjoin(app.config['JOB_DIR'], 'vcf', '*')):
        try:
            with open(pjoin(folder, 'status.json'), 'r') as f:
                status = json.load(f)
            with open(pjoin(folder, 'info.json'), 'r') as f:
                info = json.load(f)
            info['status'] = status['status']
            vcfs.append(info)
        except OSError:
            # one of those json doesn't exist so we remove the folder
            shutil.rmtree(folder)

    res = {
        'content': vcfs
    }
    return jsonify(res)


@app.route('/vcf/<vcf_id>', methods=['GET'])
def get_vcf(vcf_id):
    if not os.path.isdir(pjoin(app.config['JOB_DIR'], 'vcf', vcf_id)):
        abort(make_response(jsonify(message="ID not found"), 404))
    try:
        with open(pjoin(app.config['JOB_DIR'], 'vcf', vcf_id, 'status.json'), 'r') as f:
            status = json.load(f)
        with open(pjoin(app.config['JOB_DIR'], 'vcf', vcf_id, 'info.json'), 'r') as f:
            info = json.load(f)
        info['log'] = status

        sklog = pjoin(app.config['JOB_DIR'], 'vcf',
                      vcf_id, '.snakemake', 'log', '*')

        p = subprocess.run(
            ["/bin/bash", "-c", "-l",
             f'tail -v {sklog}'],
            capture_output=True,
            text=True
        )

        info['snakemake'] = p.stdout

        return jsonify(info)
    except OSError:
        # one of those json doesn't exist so we remove the folder
        shutil.rmtree(pjoin(app.config['JOB_DIR'], 'vcf', vcf_id))
        abort(make_response(jsonify(message="ID not valid"), 404))


@app.route('/vcf', methods=['DELETE'])
def rm_vcf_list():
    if not request.is_json:
        abort(make_response(
            jsonify(message="Illegal request: not a JSON."), 400))

    content = request.get_json()
    for vcf_id in content['id']:
        if os.path.isdir(pjoin(app.config['JOB_DIR'], 'vcf', vcf_id)):
            shutil.rmtree(pjoin(app.config['JOB_DIR'], 'vcf', vcf_id))

    info = {
        "content": "Deleted successfully."
    }

    return jsonify(info)


@app.route('/vcf/<vcf_id>', methods=['DELETE'])
def rm_vcf(vcf_id):
    if not os.path.isdir(pjoin(app.config['JOB_DIR'], 'vcf', vcf_id)):
        abort(make_response(jsonify(message="ID not found"), 404))

    shutil.rmtree(pjoin(app.config['JOB_DIR'], 'vcf', vcf_id))
    info = {
        "content": "Deleted successfully."
    }

    return jsonify(info)


@app.route('/vcf', methods=['POST'])
def post_vcf():
    try:
        filetype = request.form['filetype']
        if filetype == 'fasta':
            cores = request.form['cores']
    except Exception:
        abort(make_response(
            jsonify(message="Illegal request: missing filetype or cores"), 400))

    if filetype != 'fasta' and filetype != 'vcf':
        abort(make_response(jsonify(message="Illegal or missing filetype"), 400))

    if 'file' not in request.files:
        abort(make_response(jsonify(message="Missing file"), 400))
    if 'reference' not in request.files:
        abort(make_response(jsonify(message="Missing file"), 400))

    rfile = request.files['file']
    reffile = request.files['reference']

    if rfile.filename == '':
        abort(make_response(jsonify(message="Missing filename"), 400))
    if reffile.filename == '':
        abort(make_response(jsonify(message="Missing filename"), 400))

    uuid = datetime.datetime.now().strftime('%Y%m%d-%H%M%S_') + str(uuid4())

    if 'alias' in request.form:
        alias = request.form['alias']
    else:
        alias = uuid

    workdir = pjoin(
        app.config['JOB_DIR'],
        'vcf',
        f'{uuid}'
    )
    mkdirp(workdir)

    # Download file
    dfile = pjoin(workdir, secure_filename(rfile.filename))
    rfile.save(dfile)

    # Download reference
    refpath = pjoin(workdir, secure_filename(reffile.filename))
    reffile.save(refpath)

    # Download GTF (optional)
    if 'gtf' not in request.files:
        gtfpath = "NULL"
    else:
        gtffile = request.files['gtf']
        gtfpath = pjoin(workdir, secure_filename(gtffile.filename))
        gtffile.save(gtfpath)

    info = {
        "filename": dfile,
        "id": uuid,
        "description": str(request.form.get('description')),
        "alias": alias,
        "reference": refpath,
        "gtf": gtfpath
    }
    if filetype == 'fasta':
        info['params'] = {"cores": cores}

    with open(pjoin(workdir, 'info.json'), 'w+') as f:
        json.dump(info, f)

    if filetype == 'fasta':
        multifa = dfile
        config = pjoin(workdir, 'config.vcf.yaml')
        reference = info["reference"]
        gtf = info["gtf"]
        with open(config, 'w+') as conf:
            conf.write(
                f'workdir: {workdir}\n' +
                f'multifa: {multifa}\n' +
                f'reference: {reference}\n' +
                f'gtf: {gtf}\n' +
                f'cores: {cores}\n'
            )

        # Create a status.json with status "Pending"
        status = {
            "status": "Pending",
            "last_time": str(datetime.datetime.today().replace(microsecond=0))
        }
        with open(pjoin(workdir, 'status.json'), 'w+') as f:
            json.dump(status, f)

        p = Popen(
            [
                "nohup",
                "/bin/bash", "-c", "-l",
                f'snakemake -s {app.config["SK_VCF"]} --configfile {config} -d {workdir}'
            ],
            cwd=app.config["SK_CWD"],
            stdout=open('/dev/null', 'w'),
            stderr=open('/dev/null', 'w'),
            # with this below p will also ignore SIGINT and SIGTERM
            preexec_fn=os.setpgrp
        )

        sleep(1)

        with open(pjoin(workdir, 'status.json'), 'r') as f:
            status = json.load(f)

        info['status'] = status['status']

        return jsonify(info)

    elif filetype == 'vcf':

        status = {
            "status": "Uploaded",
            "last_time": str(datetime.datetime.today().replace(microsecond=0)),
            "output": {
                'vcf': dfile,
                'reference': refpath
            },
        }

        with open(pjoin(workdir, 'status.json'), 'w+') as f:
            json.dump(status, f)

        info['status'] = status['status']

        return jsonify(info)


@app.route('/malva', methods=['GET'])
def get_malva_list():
    malvas = list()
    for folder in glob.glob(pjoin(app.config['JOB_DIR'], 'malva', '*')):
        try:
            with open(pjoin(folder, 'status.json'), 'r') as f:
                status = json.load(f)
            with open(pjoin(folder, 'info.json'), 'r') as f:
                info = json.load(f)
            info['status'] = status['status']
            malvas.append(info)
        except OSError:
            # one of those json doesn't exist so we remove the folder
            shutil.rmtree(folder)

    res = {
        'content': malvas
    }
    return jsonify(res)


@app.route('/malva/<malva_id>', methods=['GET'])
def get_malva(malva_id):
    if not os.path.isdir(pjoin(app.config['JOB_DIR'], 'malva', malva_id)):
        abort(make_response(jsonify(message="ID not found"), 404))
    try:
        with open(pjoin(app.config['JOB_DIR'], 'malva', malva_id, 'status.json'), 'r') as f:
            status = json.load(f)
        with open(pjoin(app.config['JOB_DIR'], 'malva', malva_id, 'info.json'), 'r') as f:
            info = json.load(f)
        info['log'] = status

        sklog = pjoin(app.config['JOB_DIR'], 'malva',
                      malva_id, '.snakemake', 'log', '*')

        p = subprocess.run(
            ["/bin/bash", "-c", "-l",
             f'tail -v {sklog}'],
            capture_output=True,
            text=True
        )

        info['snakemake'] = p.stdout

        return jsonify(info)
    except OSError:
        # one of those json doesn't exist so we remove the folder
        shutil.rmtree(pjoin(app.config['JOB_DIR'], 'malva', malva_id))
        abort(make_response(jsonify(message="ID not valid"), 404))


@app.route('/malva/<malva_id>', methods=['DELETE'])
def rm_malva(malva_id):
    if not os.path.isdir(pjoin(app.config['JOB_DIR'], 'malva', malva_id)):
        abort(make_response(jsonify(message="ID not found"), 404))

    shutil.rmtree(pjoin(app.config['JOB_DIR'], 'malva', malva_id))
    info = {
        "content": "Deleted successfully."
    }

    return jsonify(info)


@app.route('/malva', methods=['DELETE'])
def rm_malva_list():
    if not request.is_json:
        abort(make_response(
            jsonify(message="Illegal request: not a JSON."), 400))

    content = request.get_json()
    for malva_id in content['id']:
        if os.path.isdir(pjoin(app.config['JOB_DIR'], 'malva', malva_id)):
            shutil.rmtree(pjoin(app.config['JOB_DIR'], 'malva', malva_id))

    info = {
        "content": "Deleted successfully."
    }

    return jsonify(info)


@app.route('/malva', methods=['POST'])
def post_malva():
    try:
        vcf = request.form['vcf']
        minocc = request.form['minocc']
        maxocc = request.form['maxocc']
        lenkmers = request.form['lenkmers']
        maxmem = request.form['maxmem']
        cores = request.form['cores']
        malvak = request.form['malvak']

    except Exception as e:
        abort(make_response(jsonify(message="Illegal request: " + str(e)), 400))

    if not os.path.isdir(pjoin(app.config['JOB_DIR'], 'vcf', vcf)):
        abort(make_response(jsonify(message="VCF ID not found"), 404))

    with open(pjoin(app.config['JOB_DIR'], 'vcf', vcf, 'status.json'), 'r') as f:
        status = json.load(f)
    with open(pjoin(app.config['JOB_DIR'], 'vcf', vcf, 'info.json'), 'r') as f:
        info = json.load(f)

    if status['status'] == 'Uploaded':
        vcfpath = status['output']['vcf']
    else:
        vcfpath = pjoin(
            app.config['JOB_DIR'],
            'vcf',
            vcf,
            'vcf', 'run.cleaned.vcf'
        )
    reference = info['reference']
    gtf = info['gtf']

    uuid = datetime.datetime.now().strftime('%Y%m%d-%H%M%S_') + str(uuid4())
    workdir = pjoin(
        app.config['JOB_DIR'],
        'malva',
        f'{uuid}'
    )

    if 'sample' not in request.files:
        abort(make_response(jsonify(message="Missing file"), 400))
    rfile = request.files['sample']

    # if user does not select file, browser also
    # submit an empty part without filename
    if rfile.filename == '':
        abort(make_response(jsonify(message="Missing filename"), 400))

    mkdirp(workdir)
    dfile = pjoin(workdir, secure_filename(rfile.filename))
    rfile.save(dfile)

    if 'alias' in request.form:
        alias = request.form['alias']
    else:
        alias = uuid

    info = {
        "filename": dfile,
        "id": uuid,
        "params": {
            'vcf': vcf,
            'minocc': minocc,
            'maxocc': maxocc,
            'lenkmers': lenkmers,
            'maxmem': maxmem,
            'cores': cores,
            'malvak': malvak
        },
        "description": str(request.form.get('description')),
        "alias": alias,
        "input": {
            "vcf": vcfpath,
            "reference": reference,
            "gtf": gtf
        }
    }
    with open(pjoin(workdir, 'info.json'), 'w+') as f:
        json.dump(info, f)

    config = pjoin(workdir, 'config.malva.yaml')
    with open(config, 'w+') as conf:
        conf.write(
            f'workdir: {workdir}\n' +
            f'reference: {reference}\n' +
            f'vcf: {vcfpath}\n' +
            f'sample: {dfile}\n'
            f'minocc: {minocc}\n' +
            f'maxocc: {maxocc}\n' +
            f'lenkmers: {lenkmers}\n' +
            f'malvak: {malvak}\n' +
            f'maxmem: {maxmem}\n' +
            f'gtf: {gtf}\n' +
            f'cores: {cores}\n'
        )

    status = {
        "status": "Pending",
        "last_time": str(datetime.datetime.today().replace(microsecond=0))
    }
    with open(pjoin(workdir, 'status.json'), 'w+') as f:
        json.dump(status, f)

    p = Popen(
        [
            "nohup",
            "/bin/bash", "-c", "-l",
            f'snakemake -s {app.config["SK_MALVA"]} --configfile {config} -d {workdir}'
        ],
        cwd=app.config["SK_CWD"],
        stdout=open('/dev/null', 'w'),
        stderr=open('/dev/null', 'w'),
        # with this below p will also ignore SIGINT and SIGTERM
        preexec_fn=os.setpgrp
    )

    sleep(1)

    with open(pjoin(workdir, 'status.json'), 'r') as f:
        status = json.load(f)

    info['status'] = status['status']

    return jsonify(info)
