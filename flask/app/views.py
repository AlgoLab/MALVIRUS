import subprocess
from flask import render_template, jsonify, request, abort, make_response
from app import app
from werkzeug.utils import secure_filename

from os.path import join as pjoin
from pathlib import Path
from os import getcwd

from uuid import uuid4


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
    p = subprocess.run(
        ["/bin/bash", "-c", "-l", "snakemake -v"],
        capture_output=True,
        text=True
    )
    return p.stdout


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
    if request.form.get('filetype') == 'fasta':
        uuid = str(uuid4())
        workdir = pjoin(
            app.config['JOB_DIR'],
            'vcf',
            f'job_{uuid}'
        )

        if 'file' not in request.files:
            abort(make_response(jsonify(message="Missign file"), 400))
        fasta = request.files['file']

        # if user does not select file, browser also
        # submit an empty part without filename
        if fasta.filename == '':
            abort(make_response(jsonify(message="Missign filename"), 400))

        mkdirp(workdir)
        multifa = pjoin(workdir, secure_filename(fasta.filename))
        config = pjoin(workdir, 'config.vcf.yaml')
        fasta.save(multifa)
        with open(config, 'w+') as conf:
            conf.write(
                f'wordkir: {workdir}\n' +
                f'multifa: {multifa}\n'
            )

        # p = subprocess.run(
        #     [
        #         "/bin/bash", "-c", "-l ",
        #         # f'snakemake -s {app.config["SK_VCF"]} --configfile {config}',
        #         "snakemake -v"
        #     ], capture_output=True,
        #     text=True)

        # return p.stdout

        p = subprocess.run(
            ["/bin/bash", "-c", "-l", "snakemake -s",
             "/snakemake/Snakefile.vcf"
             ],
            capture_output=True,
            text=True
        )
        return p.stdout

    elif request.form.get('filetype') == 'vcf':
        return 'TODO: upload VCF'
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
