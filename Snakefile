configfile: "config.yaml"

import os
pjoin = os.path.join

references_path = config["paths"]["multifa"]
sample_path = config["paths"]["sample"]

working_dir = config["workdir"]
logs_dir = pjoin(working_dir, "logs")

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
        time = pjoin(logs_dir, "mafft.time")
    shell:
        """
        /usr/bin/time -vo {log.time} ~/covid/software/mafft-7.453-with-extensions/scripts/mafft --auto --thread {threads} {input.fa} > {output.msa} 2> {log.out}
        """

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
        time = pjoin(logs_dir, "snpsites.time")
    shell:
        """
        /usr/bin/time -vo {log.time} ~/covid/software/snp-sites/src/snp-sites -rmcv -o {params.prefix} {input.msa} &> {log.out}
        """

# Clean VCF header fixing repeated sample ids (maybe useless. But it was common with GISAID)
rule vcf_clean_header:
    input:
        pjoin(working_dir, "run.vcf")
    output:
        temp(pjoin(working_dir, "run.1.vcf"))
    threads: 1
    log:
        out = pjoin(logs_dir, "vcf_clean.1.log"),
        time = pjoin(logs_dir, "vcf_clean.1.time")
    shell:
        """
        /usr/bin/time -vo {log.time} python3 ~/covid/software/format_vcf.py clean {input} > {output} 2> {log.out}
        """

# Computes a priori frequencies
rule vcf_add_freqs:
    input:
        pjoin(working_dir, "run.1.vcf")
    output:
        pjoin(working_dir, "run.cleaned.vcf")
    threads: 1
    log:
        out = pjoin(logs_dir, "vcf_clean.2.log"),
        time = pjoin(logs_dir, "vcf_clean.2.time")
    shell:
        """
        /usr/bin/time -vo {log.time} python3 ~/covid/software/format_vcf.py freq {input} > {output} 2> {log.out}
        """

# Run KMC
rule kmc:
    input:
        sample_path
    output:
        pjoin(working_dir, "KMC", "kmers.kmc_pre")
    params:
        kmc_prefix = pjoin(working_dir, "KMC", "kmers"),
        kmc_tmp = pjoin(working_dir, "KMC", "tmp")
    threads: 4
    log:
        out = pjoin(logs_dir, "kmc.log"),
        time = pjoin(logs_dir, "kmc.time")
    shell:
        """
        mkdir -p {params.kmc_tmp}
        /usr/bin/time -vo {log.time} ~/covid/software/malva/KMC/bin/kmc -t{threads} -m4 -k43 -ci5 -cs750 -fq {input} {params.kmc_prefix} {params.kmc_tmp} &> {log.out}
        rm -r {params.kmc_tmp}
        """

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
        time = pjoin(logs_dir, "malva.time")
    shell:
        """
        /usr/bin/time -vo {log.time} ~/covid/software/malva/malva-geno -k 35 -r 43 -c 750 -b 1 {input.ref} {input.vcf} {params.kmc_prefix} > {output.vcf} 2> {log.out}
        """
