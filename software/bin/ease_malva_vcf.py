#!/usr/bin/env python3

import argparse
from pysam import VariantFile

def main():
    parser = argparse.ArgumentParser(description="Tags the variants in a VCF with the corresponding gene.")
    parser.add_argument("vcf_path", metavar="VCF", type=str, help="Path to VCF file")

    args = parser.parse_args()

    vcf = VariantFile(args.vcf_path, 'r', drop_samples = False)

    print(vcf.header, end='')

    for record in vcf:
        gt = record.samples[0]['GT'][0]
        if gt == 0:
            record.alts = record.ref
        else:
            record.alts = (record.alts[gt - 1])
            record.samples[0]['GT'] = (1,)
        print(record, end='')

if __name__ == "__main__":
    main()
