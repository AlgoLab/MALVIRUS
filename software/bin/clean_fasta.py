#!/usr/bin/env python3

import sys
import re

from Bio import SeqIO

def main():
    fa_path = sys.argv[1]
    seq_to_remove = sys.argv[2] if len(sys.argv) > 2 else None # eg NC_045512.2 or EPI_ISL_416412
    for record in SeqIO.parse(fa_path, "fasta"):
        if seq_to_remove is not None and seq_to_remove in record.id:
            continue
        nn = record.upper().seq.count("N")
        if nn == 0:
            SeqIO.write(record, sys.stdout, "fasta")

if __name__ == "__main__":
    main()
