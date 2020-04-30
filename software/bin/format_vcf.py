#!/usr/bin/env python3

import sys
from pysam import VariantFile

def add_freqs():
    vcf_path = sys.argv[2]
    fai_path = sys.argv[3]

    vcf = VariantFile(vcf_path, 'r', drop_samples = False)

    ref_name, ref_len = open(fai_path).readlines()[0].strip('\n').split('\t')[0:2]
    new_contig = f"##contig=<ID={ref_name},length={ref_len}>"

    vcf.header.add_line(new_contig)
    vcf.header.add_line("##INFO=<ID=AF,Number=A,Type=Float,Description=\"Estimated allele frequency in the range (0,1)\">")
    print('\n'.join(str(vcf.header).split('\n')[:-1]))

    for record in vcf:
        if record.pos <= 50 or record.pos >= int(ref_len)-50:
            continue
        tot_alleles = len(record.alleles)
        n_gts = {}
        tot_samples = len(record.samples)
        for sample_name in record.samples:
            curr_gt = record.samples[sample_name]['GT'][0]
            n_gts[curr_gt] = n_gts[curr_gt]+1 if curr_gt in n_gts else 1
        for gt in n_gts:
            n_gts[gt] /= tot_samples
            n_gts[gt] = round(n_gts[gt], 5)
        freq_string = ','.join([str(n_gts[i]) for i in range(1,tot_alleles)])
        alt_freqs = [n_gts[i] for i in range(1,tot_alleles)]
        record.chrom = ref_name
        record.info.__setitem__("AF", alt_freqs)
        print(record, end='')

def clean_header():
    vcf_path = sys.argv[2]
    for line in open(vcf_path, "r"):
        if line.startswith("#C"):
            fields = line.strip("\n").split("\t")
            repeats = {}
            new_fields = []
            for field in fields:
                if field in repeats:
                    repeats[field] = repeats[field]+1
                    field = field + "_" + str(repeats[field])
                else:
                    repeats[field] = 1
                new_fields.append(field)
            line = "\t".join(new_fields) + "\n"
        print(line, end="")

if __name__ == "__main__":
    if sys.argv[1] == "clean":
        clean_header()
    elif sys.argv[1] == "freq":
        add_freqs()
