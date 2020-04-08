configfile: "config.yaml"

import os
import datetime
import subprocess
import json
import re

pjoin = os.path.join

references_path = config["paths"]["multifa"]
sample_path_config = config["paths"]["sample"]

working_dir = config["workdir"]
logs_dir = pjoin(working_dir, "logs")

def nowf():
    return str(datetime.datetime.today().replace(microsecond=0))

def format_json(cmd, result, returncode, inp, out, parameters = None):
    configs = config
    d = {}
    d['command'] = cmd
    d['result'] = result
    d['return_code'] = returncode
    d['config'] = configs
    d['input'] = {}
    for name, value in inp.items():
        d['input'][name] = value
    d['output'] = {}
    for name, value in out.items():
        d['output'][name] = value
    d['params'] = {}
    if parameters is not None:
        for name, value in parameters.items():
            d['params'][name] = value
    d['time'] = nowf()
    return json.dumps(d)

rule run:
    input:
        pjoin(working_dir, "malva.vcf")
        
# Multi alignment with mafft
rule multi_align:
    input:
        fa = references_path
    output:
        msa = pjoin(working_dir, "multi_alignment.msa")
    threads: 16
    log:
        out = pjoin(logs_dir, "mafft.log"),
        time = pjoin(logs_dir, "mafft.time"),
        json = pjoin(logs_dir, "mafft.json")
    run:
        cmdstr = f"~/covid/software/mafft-7.453-with-extensions/scripts/mafft --auto --thread {threads} {input.fa} > {output.msa} 2> {log.out}"
        with open(log.json, "w") as jf:
            try:
                shell.check_output(cmdstr)
                jf.write(format_json(cmdstr, "Success", 0, input, output))
            except subprocess.CalledProcessError as e:
                jf.write(format_json(cmdstr, "Failed", e.returncode, input, output))
                raise e

# Create vcf from multi alignment
rule vcf_build:
    input:
        msa = pjoin(working_dir, "multi_alignment.msa")
    output:
        ref = pjoin(working_dir, "run.pseudoreference.fa"),
        snps = pjoin(working_dir, "run.vcf")
    params:
        prefix = pjoin(working_dir, "run")
    threads: 1
    log:
        out = pjoin(logs_dir, "snpsites.log"),
        time = pjoin(logs_dir, "snpsites.time"),
        json = pjoin(logs_dir, "snpsites.json")
    run:
        cmdstr = f"~/covid/software/snp-sites/src/snp-sites -rmcv -o {params.prefix} {input.msa} &> {log.out}"
        with open(log.json, "w") as jf:
            try:
                shell.check_output(cmdstr)
                jf.write(format_json(cmdstr, "Success", 0, input, output, params))
            except subprocess.CalledProcessError as e:
                jf.write(format_json(cmdstr, "Success", e.returncode, input, output, params))
                raise e

# Clean VCF header fixing repeated sample ids (maybe useless. But it was common with GISAID)
rule vcf_clean_header:
    input:
        base_vcf = pjoin(working_dir, "run.vcf")
    output:
        clean_vcf = temp(pjoin(working_dir, "run.1.vcf"))
    threads: 1
    log:
        out = pjoin(logs_dir, "vcf_clean.1.log"),
        time = pjoin(logs_dir, "vcf_clean.1.time"),
        json = pjoin(logs_dir, "vcf_clean.1.json")
    run:
        cmdstr = f"python3 ~/covid/software/format_vcf.py clean {input.base_vcf} > {output.clean_vcf} 2> {log.out}"
        with open(log.json, "w") as jf:
            try:
                shell.check_output(cmdstr)
                jf.write(format_json(cmdstr, "Success", 0, input, output))
            except subprocess.CalledProcessError as e:
                jf.write(format_json(cmdstr, "Success", e.returncode, input, output))
                raise e

# Computes a priori frequencies
rule vcf_add_freqs:
    input:
        clean_vcf = pjoin(working_dir, "run.1.vcf")
    output:
        freq_vcf = pjoin(working_dir, "run.cleaned.vcf")
    threads: 1
    log:
        out = pjoin(logs_dir, "vcf_clean.2.log"),
        time = pjoin(logs_dir, "vcf_clean.2.time"),
        json = pjoin(logs_dir, "vcf_clean.2.json")
    run:
        cmdstr = f"python3 ~/covid/software/format_vcf.py freq {input.clean_vcf} > {output.freq_vcf} 2> {log.out}"
        with open(log.json, "w") as jf:
            try:
                shell.check_output(cmdstr)
                jf.write(format_json(cmdstr, "Success", 0, input, output))
            except subprocess.CalledProcessError as e:
                jf.write(format_json(cmdstr, "Success", e.returncode, input, output))
                raise e

# Run KMC
rule kmc:
    input:
        sample_path = sample_path_config
    output:
        kmc_out = pjoin(working_dir, "KMC", "kmers.kmc_pre")
    params:
        kmc_prefix = pjoin(working_dir, "KMC", "kmers"),
        kmc_tmp = pjoin(working_dir, "KMC", "tmp")
    threads: 4
    log:
        out = pjoin(logs_dir, "kmc.log"),
        time = pjoin(logs_dir, "kmc.time"),
        json = pjoin(logs_dir, "kmc.json")
    run:
        shell("mkdir -p {params.kmc_tmp}")
        cmdstr = f"~/covid/software/malva/KMC/bin/kmc -t{threads} -m4 -k43 -ci5 -cs750 -fm {input.sample_path} {params.kmc_prefix} {params.kmc_tmp} &> {log.out}"
        with open(log.json, "w") as jf:
            try:
                shell.check_output(cmdstr)
                jf.write(format_json(cmdstr, "Success", 0, input, output, params))
                shell("rm -fr {params.kmc_tmp}")
            except subprocess.CalledProcessError as e:
                jf.write(format_json(cmdstr, "Success", e.returncode, input, output, params))
                shell("rm -fr {params.kmc_tmp}")
                raise e

# Run MALVA
rule malva:
    input:
        ref = pjoin(working_dir, "run.pseudoreference.fa"),
        vcf = pjoin(working_dir, "run.cleaned.vcf"),
        kmc = pjoin(working_dir, "KMC", "kmers.kmc_pre")
    params:
        kmc_prefix = pjoin(working_dir, "KMC", "kmers")
    output:
        vcf = pjoin(working_dir, "malva.vcf")
    threads: 1
    log:
        out = pjoin(logs_dir, "malva.log"),
        time = pjoin(logs_dir, "malva.time"),
        json = pjoin(logs_dir, "malva.json")
    run:
        cmdstr = f"~/covid/software/malva/malva-geno -k 35 \
-r 43 -c 750 -b 1 {input.ref} {input.vcf} {params.kmc_prefix} > {output.vcf} 2> {log.out}"
        with open(log.json, "w") as jf:
            try:
                shell.check_output(cmdstr)
                jf.write(format_json(cmdstr, "Success", 0, input, output, params))
            except subprocess.CalledProcessError as e:
                jf.write(format_json(cmdstr, "Success", e.returncode, input, output, params))
                raise e
