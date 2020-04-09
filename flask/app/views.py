import subprocess
from flask import render_template
from app import app

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