# MALVIRUS

MALVIRUS is a fast and accurate tool for genotyping haploid individuals that does not require to assemble the read nor mapping them to a reference genome.
It is tailored to work with virological data and can genotype an individual directly from sequencing data in minutes.

MALVIRUS is divided into two logically distinct steps: the creation of the index representing the knowledge base of the specie under investigation and the genotype imputation.
The first step is based on mafft [[1]](#mafft7) and snp-sites [[2]](#snp-sites), whereas the second step is based on KMC [[3]](#kmc) and MALVA [[4]](#malva).

The index can be built once and reused for genotyping multiple individuals.

Please see the following documents for additional details:

* [Installation](./INSTALL.md)
* [Usage](./USAGE.md)
* [Tutorial](.TUTORIAL.md)

MALVIRUS is distributed as a docker image and is publicly available on [github](https://github.com/AlgoLab/malva_covid_service).
The service was tested under Ubuntu GNU/Linux version 18.04 and requires docker installed on the system.

# References

<a id="mafft7">[1]</a> Katoh, Kazutaka, and Daron M. Standley. 2013. “MAFFT Multiple Sequence Alignment Software Version 7: Improvements in Performance and Usability.” Molecular Biology and Evolution 30 (4): 772–80. doi:10.1093/molbev/mst010.

<a id="snp-sites">[2]</a> Page, Andrew J., Ben Taylor, Aidan J. Delaney, Jorge Soares, Torsten Seemann, Jacqueline A. Keane, and Simon R. Harris. 2016. “SNP-Sites: Rapid Efficient Extraction of Snps from Multi-Fasta Alignments.” Journal Article. Microbial Genomics 2 (4). Microbiology Society. doi:https://doi.org/10.1099/mgen.0.000056.

<a id="kmc">[3]</a> Kokot, Marek, Maciej Dlugosz, and Sebastian Deorowicz. 2017. “KMC 3: counting and manipulating k-mer statistics.” Bioinformatics 33 (17): 2759–61. doi:10.1093/bioinformatics/btx304.

<a id="malva">[4]</a> Denti, Luca, Marco Previtali, Giulia Bernardini, Alexander Schönhuth, and Paola Bonizzoni. 2019. “MALVA: Genotyping by Mapping-Free Allele Detection of Known Variants.” iScience 18: 20–27. doi:https://doi.org/10.1016/j.isci.2019.07.011.