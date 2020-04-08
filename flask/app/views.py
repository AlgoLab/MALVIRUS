import subprocess
from app import app

@app.route('/')
def home():
   p = subprocess.run(
      ["/bin/bash", "-c", "-l", "snakemake -v"],
      capture_output=True,
      text=True
   )
   return p.stdout
