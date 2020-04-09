from flask import Flask
app = Flask(__name__)
app.config['JOB_DIR'] = '/snakemake/jobs'
app.config['SK_VCF'] = '/snakemake/Snakefile.vcf'
app.config['SK_MALVA'] = '/snakemake/Snakefile.malva'
from app import views
