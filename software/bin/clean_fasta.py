#!/usr/bin/env python3

import sys
import re

from Bio import SeqIO

def clean():
    fa_path = sys.argv[2]
    seq_to_remove = sys.argv[3] if len(sys.argv) > 3 else None # eg NC_045512.2 or EPI_ISL_416412
    for record in SeqIO.parse(fa_path, "fasta"):
        if seq_to_remove is not None and seq_to_remove in record.id:
            continue
        SeqIO.write(record, sys.stdout, "fasta")

def extract():
    fa_path = sys.argv[2]
    seq_to_remove = sys.argv[3]
    for record in SeqIO.parse(fa_path, "fasta"):
        if seq_to_remove in record.id:
            SeqIO.write(record, sys.stdout, "fasta")
            break

def main():
    if sys.argv[1] == "clean":
        clean()
    elif sys.argv[1] == "extract":
        extract()

if __name__ == "__main__":
    main()
