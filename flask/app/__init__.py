from flask import Flask
app = Flask(__name__)
app.config['JOB_DIR'] = '/jobs'
app.config['SK_CWD'] = '/snakemake'
app.config['SK_VCF'] = '/snakemake/Snakefile.vcf'
app.config['SK_MALVA'] = '/snakemake/Snakefile.malva'
app.config['GIT_DIR'] = '/jobs'
from app import views
