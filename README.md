# malva_covid

Step:
1. creazione del multiallineamento dai references `.fa`
2. creazione del VCF dal multiallineamento
3. pulitura del VCF
4. kmer counting con KMC
5. genotipizzazione con MALVA

## Snakefile
#### HowTo
Impostare in config.yaml i path:
* `workdir`: directory dove si vogliono tutti i file (intermedi e di output)
* `multifa`: references da cui creare il vcf
* `sample`: il sample

Poi basta:
```
snakemake
```

Ho caricato dei file di esempio.

#### Fixme/Todo
* tutti i path ai tool/script sono hardcoded per farlo funzionare su mendel (container scc)
* la maggior parte dei tool sono disponibili su conda. Per snp-sites sto usando un mio fork con modifiche per far scrivere su file lo pseudoreference
* è quasi tutto hardcoded (threads e parametri per KMC e malva). Potremmo lasciare l'utente libero di cambiare alcuni dei parametri tramite "interfaccia"
* per KMC il sample va indicato con `-f<a/q/m/bam>` sulla base del tipo
