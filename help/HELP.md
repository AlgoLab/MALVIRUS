---
title: MALVIRUS User Manual
author: Simone Ciccolella, Luca Denti, Yuri Pirola, Marco Previtali
---

# Table Of Contents
1. [General Information](#general-information)
2. [Installation and Boot](#installation-and-boot)
3. [Creating the index](#creating-the-index)
4. [Genotype imputation](#Genotype-imputation)
5. [Retrieving the results](#Retrieving-the-results)
6. [References](#References)

# General information
MALVIRUS is a fast and accurate tool for genotyping haploid individuals that does not require to assemble the read nor mapping them to a reference genome.
It is tailored to work with virological data and can genotype an individual directly from sequencing data in minutes.

This document will guide you through its interface and its functionalities.

MALVIRUS is divided into two logically distinct steps: the creation of the index representing the knowledge base of the specie under investigation and the genotype imputation.
The first step is based on mafft[@mafft7] and snp-sites[@snp-sites], whereas the second step is based on KMC[@kmc] and MALVA[@malva].

The index can be built once and reused for genotyping multiple individuals.

MALVIRUS is distributed as a docker image and is publicly available on [github](https://github.com/AlgoLab/malva_covid_service).
The service was tested under Ubuntu GNU/Linux version 18.04 and requires docker installed on the system.

# Installation and Boot
Clone the git repository at [github.com/AlgoLab/malva\_covid\_service](https://github.com/AlgoLab/malva_covid_service) and execute the <span style="color:black">run-backend.sh</span> script.
The first time you will run the script it will setup the docker image and install the required software in it, note that this first step might might require up to 30 minutes.

After the first setup, booting up the system requires less than a minute.

Once the setup is complete, MALVIRUS will be available [on port 56733](http://localhost:56733) and can be accessed by using an internet browser.
As stated previously, MALVIRUS is logically split into to steps.
We will first show how to create an index and then how to use it to genotype an individual.

# Creating the index

There are two main approaches to build an index of known variants.
The first one is to build it from a reference genome and a set of genomic sequences of the same specie (i.e., a set of _assemblies_), whereas the second is to upload a reference genome and a VCF file.

#### Building the index from a population of genomes

We will first show how to build the index from a reference genome and a set of genomic sequences.
Note that, the reference genome must be in FASTA format, whereas the set of genomic sequences must be in multi-FASTA format.

To build the index, first head to the _Reference VCFs_ tab which is at the top of MALVIRUS homepage and click on the _Build a reference VCF from genomes_ button that will redirect you to another page were you will be presented with a form.
First, fill in the _Alias_ and _Description_ fields as you please (Alias will be the name of the index so use some meaningful term).
Then, upload you reference genome sequence in FASTA format in the _Reference genomic sequence_ field and the multi-FASTA of the set of genomic sequences in the _Population genomic sequences_ field.

If available, you can also upload the annotation of the reference genome in either GTF of GFF format in the _Gene Annotation_ field.
If you upload this information, then variant calls that will use this index will be able to tag variants using gene names.

Once every field is filled with the correct information, click on the _Submit_ button at the bottom and the index will be built.
After clicking on the submit button, you will be presented with the status page of the job; click the _Refresh_ button at the bottom to refresh the information in it.

The job will align the genomic sequences of the population to the reference genome using [mafft](https://mafft.cbrc.jp/alignment/software/) and will convert the MSA output of mafft to a VCF using [snp-sites](https://github.com/sanger-pathogens/snp-sites).

Note that for datasets composed by thousands of viral assemblies this step might requires up to 12 hours, depending on the machine the service is running on.

Clicking again on the _Reference VCFs_ tab at the top will present the list of indexes and the status of the job used to build it.
Once the status is <span style="color:#237804">Completed</span> the index can be used to call variants.

#### Uploading the index using a precomputed VCF

If the set of known variants is already available as a VCF, you can avoid computing the index and upload the reference genome and the VCF instead.

To do so, head to the _Reference VCFs_ tab on top of the MALVIRUS website and click on the _Upload a new reference VCF_ button that will redirect you to the upload form.

Fill in the _Alias_ and _Description_ fields as you please.
Upload the reference genome in the _Reference genomic sequence_ field and the VCF file of the variants in the _Reference VCF_ field.

If available, you can also upload the annotation of the reference genome in either GTF or GFF format in the _Gene Annotation_ field.
If you upload this information, then variant calls that will use this index will be able to tag variants using gene names.

Finally, click on the _Submit_ button on the bottom to upload and create the new index.

# Genotype imputation

The main goal of MALVIRUS is to genotype an individual directly from a sequencing dataset.

To do so, head to the _Variant calls_ tab you can find on the top of the homepage of MALVIRUS and click on the _Perform a new variant call_ button.

You will be presented with a form that you have to fill in with the required data.

Set the _Alias_ and _Description_ fields to something meaningful, remember _Alias_ will be the name of the job you will submit.
Then, upload the sequencing data in either FASTA of FASTQ format in the _Sample sequences_ field and chose an index to use while genotyping the data in the _Reference VCF_ field.

If no reference VCF is available in the drop-down menu of the _Reference VCF_ field, you probably did not create an index yet; head to the [Creating the index](#creating-the-index) section of this document and follow the instructions.

After uploading the sample and selecting the index you are able to submit the job by clicking the _Submit_ button.

Note that you can tune the parameters of the analysis by setting them in the _Advanced paramters_ box; the default parameters of the tool are tuned to work with high-coverage virological data (coverage higher than 100x).

This job will first extract the k-mers in the sample using [KMC](http://sun.aei.polsl.pl/REFRESH/index.php?page=projects&project=kmc&subpage=about) and will then use the k-mers call the variants using [MALVA](https://github.com/algolab/malva).

It is possible to track the status of the job by heading to the _Variant calls_ tab.
Look for your job in the table and then look at the _Status_ column.
Once the status changes from <span style="color:#0050b3">Running</span> to <span style="color:#237804">Completed</span> you can access the output of MALVIRUS.

If the status changes to <span style="color:#cf1322">Failed</span> then something went wrong and the log is linked in the status page of the job.

# Retrieving the results

The output of MALVIRUS is a single VCF file that describes the genotype of each known variant.
You can access it by heading to the _Variant calls_ tab and searching your job in the list displayed there.
Click on the alias of the job you want to analyze and you'll be presented with a table reporting various information of the job.

If the status is <span style="color:#237804">Completed</span>, then you can access and download the output VCF that will be in the _Output files_ row.
By clicking the name of the output file (usually `malva.vcf`) you'll download the vcf, whereas by clicking on the <span style="color:#2a3957">_Show in tabular form_</span> button you'll be redirected to another page that present the VCF and that highlights the differences between the reference genome and the individual under analysis.
In this page, the rows related to the variants that were genotyped differently than the reference are highlighted in blue and the last column is color coded based on the quality of the call.

# References
