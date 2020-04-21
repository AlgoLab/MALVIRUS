# MALVIRUS

MALVIRUS is a fast and accurate tool for genotyping haploid individuals that does not require to assemble the read nor mapping them to a reference genome.
It is tailored to work with virological data and can genotype an individual directly from sequencing data in minutes.

MALVIRUS is divided into two logically distinct steps: the creation of the index representing the knowledge base of the specie under investigation and the genotype imputation.
The first step is based on mafft[@mafft7] and snp-sites[@snp-sites], whereas the second step is based on KMC[@kmc] and MALVA[@malva].

The index can be built once and reused for genotyping multiple individuals.

Please see the following documents for additional details:

* [Installation](./INSTALLATION.md)
* [Usage](./USAGE.md)
* [Tutorial](.TUTORIAL.md)

MALVIRUS is distributed as a docker image and is publicly available on [github](https://github.com/AlgoLab/malva_covid_service).
The service was tested under Ubuntu GNU/Linux version 18.04 and requires docker installed on the system.

