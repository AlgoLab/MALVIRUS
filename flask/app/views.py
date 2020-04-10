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
    p = subprocess.run([
        'ls', '-1'],
        capture_output=True,
        text=True
    )
    output = str(p.stdout).split()
    test = {
        'content': output
    }
    return jsonify(test)


@app.route('/vcf/<vcf_id>', methods=['GET'])
def get_vcf(vcf_id):
    test = {
        'id': vcf_id,
        'content': 'vcf file/csv/tsv?'
    }
    return jsonify(test)


@app.route('/vcf', methods=['POST'])
def post_vcf():

    uuid = str(uuid4())
    workdir = pjoin(
        app.config['JOB_DIR'],
        'vcf',
        f'{uuid}'
    )

    if 'file' not in request.files:
        abort(make_response(jsonify(message="Missing file"), 400))
    rfile = request.files['file']

    # if user does not select file, browser also
    # submit an empty part without filename
    if rfile.filename == '':
        abort(make_response(jsonify(message="Missing filename"), 400))

    mkdirp(workdir)
    dfile = pjoin(workdir, secure_filename(rfile.filename))
    rfile.save(dfile)

    info = {
        "filename": str(secure_filename(rfile.filename)),
        "id": uuid,
        "descritption": str(request.form.get('description'))
    }
    with open(pjoin(workdir, 'info.json'), 'w+') as f:
        json.dump(info, f)

    if request.form.get('filetype') == 'fasta':
        multifa = dfile
        config = pjoin(workdir, 'config.vcf.yaml')
        with open(config, 'w+') as conf:
            conf.write(
                f'workdir: {workdir}\n' +
                f'multifa: {multifa}\n'
            )

        p = Popen(
            [
                "nohup",
                "/bin/bash", "-c", "-l",
                f'snakemake -s {app.config["SK_VCF"]} --configfile {config} --cores 5'
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

    elif request.form.get('filetype') == 'vcf':
        status = {
            "status": "Uploaded",
            "last_time": str(datetime.datetime.today().replace(microsecond=0))
        }
        with open(pjoin(workdir, 'status.json'), 'w+') as f:
            json.dump(status, f)

        info['status'] = status['status']

        return jsonify(info)
    else:
        abort(make_response(jsonify(message="Illegal or missing filetype"), 400))

    return str(request.form.get('filetype'))


@app.route('/malva', methods=['GET'])
def get_malva_list():
    test = {
        'content': 'list of malva jobs'
    }
    return jsonify(test)


@app.route('/malva/<malva_id>', methods=['GET'])
def get_amlva(malva_id):
    test = {
        'id': malva_id,
        'content': 'job details'
    }
    return jsonify(test)


@app.route('/malva', methods=['POST'])
def post_malva():
    try:
        request.form['cacca']
    except:
        abort(make_response(jsonify(message="Illegal request"), 400))

    return str(request.form)
