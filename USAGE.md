---
title: Usage
nav_order: 3
permalink: /USAGE
---
# Usage
1. [Creating the variant catalog](#creating-the-variant-catalog)
  - [Building the catalog from a population of genomes](#building-the-catalog-from-a-population-of-genomes)
  - [Uploading the catalog using a precomputed VCF](#uploading-the-catalog-using-a-precomputed-vcf)
  - [Using a precomputed catalog](#using-a-precomputed-catalog)
2. [Genotype calling](#genotype-calling)
3. [Retrieving the results](#retrieving-the-results)

## Creating the variant catalog

There are three main ways to obtain a catalog of SNP loci in MALVIRUS: creating it from a reference genome and a set of assemblies, uploading it from the user interface, and downloading the precomputed catalogs on your machine.

### Building the catalog from a population of genomes

We will first show how to build the catalog from a reference genome and a set of genomic sequences.
Note that, the reference genome must be in FASTA format, whereas the set of genomic sequences must be in multi-FASTA format.

To build the catalog, first head to the _Reference VCFs_ tab which is at the top of the MALVIRUS homepage and click on the _Build a reference VCF from genomes_ button that will redirect you to a submission form.
First, fill in the _Alias_ and _Description_ fields as you please (Alias will be the name of the catalog so use some meaningful term).
Then, in the _Reference genome_ field, you can either select a reference genome from the ones provided by MALVIRUS (_preloaded references_) or you can select _Custom reference_ and then upload your reference genome sequence in FASTA format in the _Reference genomic sequence_ field that will subsequently appear.

If available, you can also upload the annotation of the reference genome in either GTF of GFF format in the _Gene Annotation_ field.
If you upload this information, then variant calls that will use this catalog will be able to annotate variants using gene names.
If you use a preloaded reference, then variant calls will be also annotated using [SnpEff](https://pcingola.github.io/SnpEff/).

Finally, upload the multi-FASTA of the set of genomic sequences in the _Population genomic sequences_ field.

Once every field is filled with the correct information, click on the _Submit_ button at the bottom of the page and the catalog will be built.
After clicking on the submit button, you will be presented with the status page of the job; click the _Refresh_ button at the bottom to refresh the information in it.

The job will align the genomic sequences of the population to the reference genome using [mafft](https://mafft.cbrc.jp/alignment/software/) and will convert the MSA output of mafft to a VCF using [snp-sites](https://github.com/sanger-pathogens/snp-sites).
This job should require less than 10 minutes to complete.

Clicking again on the _Reference VCFs_ tab at the top will present the list of catalogs and the status of the job creating them.
Once the status is <span style="color:#237804">Completed</span> the catalog can be used to call variants.

### Uploading the catalog using a precomputed VCF

If the set of known variants is already available as a VCF file, you can avoid computing the catalog and you can directly upload the reference genome and the VCF instead instead.

To do so, head to the _Reference VCFs_ tab on top of the MALVIRUS website and click on the _Upload a new reference VCF_ button that will redirect you to the upload form.

Fill in the _Alias_ and _Description_ fields as you please.
Fill the _reference genome_ as explained in the section above and, finally, upload the VCF file of the variants in the _Reference VCF_ field.

Finally, click on the _Submit_ button on the bottom to upload and create the new catalog.

### Using a precomputed catalog

MALVIRUS ships with precomputed catalogs for SARS-CoV-2.
These catalogs of population SNP loci are based on the data in GenBank and are updated frequently.
You should find at least one precomputed catalog in the _Reference VCFs_ tab, to detect them look at entries with status "Precomputed" (the alias of these catalogs usually starts with "NCBI-").

To update the set of precomputed catalogs, click on the "Download new precomputed VCFs" button in the _Reference VCFs_ tab.
The application will download the catalogs in background and the list of catalogs will update.

## Genotype calling

The main goal of MALVIRUS is to genotype an individual directly from a sequencing dataset.

To do so, head to the _Variant calls_ tab on the top of the homepage of MALVIRUS and click on the _Perform a new variant call_ button.

You will be presented with a submission form.
First, set the _Alias_ and _Description_ fields to something meaningful. _Alias_ will be the name of the job you will submit.
Then, upload the sequencing data in either FASTA or FASTQ format (gzipped, possibly) in the _Sample sequences_ field and choose a catalog to use while genotyping the data in the _Reference VCF_ field.

If no reference VCF is available, MALVIRUS asks you to first create a variant catalog; head to the [Creating the variant catalog](#creating-the-variant-catalog) section of this document and follow the instructions.

After uploading the sample and selecting the catalog you are able to submit the job by clicking the _Submit_ button.

Note that you can tune the parameters of the analysis by setting them in the _Advanced parameters_ box; the default parameters of the tool are tuned to work with high-coverage virological data (coverage higher than 100x).

This job will first extract the k-mers in the sample using [KMC](http://sun.aei.polsl.pl/kmc) and will then use the k-mers call the variants using [MALVA](https://github.com/algolab/malva).

It is possible to track the status of the job by heading to the _Variant calls_ tab.
Look for your job in the table and then look at the _Status_ column.
Once the status changes from <span style="color:#0050b3">Running</span> to <span style="color:#237804">Completed</span> you can access the output of MALVIRUS.

If the status changes to <span style="color:#cf1322">Failed</span> then something went wrong and the log is linked in the status page of the job.

## Retrieving the results

The output of MALVIRUS is a single VCF file that describes the genotype of each known variant.
You can access it by heading to the _Variant calls_ tab and searching your job in the list displayed there.
Click on the alias of the job you want to analyze and you'll be presented with a table reporting various information of the job.

If the status is <span style="color:#237804">Completed</span>, then you can access and download the output VCF that will be in the _Output files_ row.
By clicking the name of the output file (usually `malva.vcf`) you'll download the VCF file, whereas by clicking on the _Show in tabular form_ button you'll be redirected to another page that describes the VCF and that highlights the differences between the reference genome and the strain under analysis.
In this page, by default only the wild-type variants detected in the strain are shown, to see all the variants uncheck the _Show only loci with alt.~allele_ filter.
If the variant catalog was built on a preloaded reference, then you can also view the (summarized) effect of each variant in the _Effect_ column. The full effects predicted by SnpEff for that variant can be accessed by clicking on the summarized effect.
Moreover, last column is color coded based on the quality of the call.
For convenience, at the top of this page you can find two links to download the output in VCF or as a spreadsheet.
