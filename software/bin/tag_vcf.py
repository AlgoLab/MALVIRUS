#!/usr/bin/env python3

import argparse
import gffutils
from pysam import VariantFile

def open_gtf(gtf_path):
    with_genes = False
    with_transcripts = False
    for line in open(gtf_path):
        if line.startswith('#'):
            continue
        feat_type = line.split("\t")[2]
        if feat_type == "gene":
            with_genes = True
        elif feat_type == "transcript":
            with_transcripts = True
        else:
            # TODO maybe we can use a break. There are pros and cons
            # The first feature is not always a gene.
            continue
    try:
        gtf = gffutils.FeatureDB("{}.db".format(gtf_path),
                                 keep_order=True)
    except ValueError:
        gtf = gffutils.create_db(gtf_path,
                                 dbfn = "{}.db".format(gtf_path),
                                 force = True, keep_order = True,
                                 disable_infer_genes = with_genes,
                                 disable_infer_transcripts = with_transcripts,
                                 merge_strategy = "merge",
                                 sort_attribute_values = True)
    return gtf

# The gene ORF1ab is "manually" splitted. If we change the input GTF,
# we maybe have to modify this function
def extract_cdss(gtf):
    cdss = {}
    i = 1
    for cds in gtf.features_of_type("CDS", order_by = "start"):
        s,e = cds.start, cds.end
        gene_name = cds.attributes["gene"][0]
        if gene_name == "ORF1ab":
            # We have to manage this gene: it has 3 CDS. Since they
            # are ordered, we considered the first (1) and the last
            # one (3) as in Nextstrain.
            if i == 1:
                # 266:13468 -> ORF1a
                gene_name = gene_name[:-1]
                i+=1
            elif i == 3:
                # 13468:21555 -> ORF1b
                gene_name = gene_name[:-2] + gene_name[-1]
                i+=1
            else:
                i+=1
                continue
        cdss[(s,e)] = gene_name
    return cdss

def get_gene_name(cdss, pos):
    for (s,e),gene_name in cdss.items():
        if s <= pos <= e:
            return gene_name
    return "None"

def main():
    parser = argparse.ArgumentParser(description="Tags the variants in a VCF with the corresponding gene.")
    parser.add_argument("-a", dest="all_flag", action="store_true", help="Print all variants, not only the ones with genotype>0")
    parser.add_argument("vcf_path", metavar="VCF", type=str, help="Path to VCF file")
    parser.add_argument("gtf_path", metavar="GTF", type=str, help="Path to GTF file")

    args = parser.parse_args()

    with_anno = args.gtf_path != "None"
    if with_anno:
        gtf = open_gtf(args.gtf_path)
        cdss = extract_cdss(gtf)

    vcf = VariantFile(args.vcf_path, 'r', drop_samples = False)
    
    vcf.header.add_line("##INFO=<ID=GENE,Number=1,Type=String,Description=\"Genic region\">")
    print('\n'.join(str(vcf.header).split('\n')[:-1]))

    for record in vcf:
        gt = record.samples[0]['GT'][0]
        if gt == 0 and not args.all_flag:
            continue
        if with_anno:
            gene_name = get_gene_name(cdss, record.pos)
            record.info.__setitem__("GENE", gene_name)
        print(record, end='')

if __name__ == "__main__":
    main()
