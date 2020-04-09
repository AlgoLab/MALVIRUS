# malva_covid

Step:
1. creazione del multiallineamento dai references `.fa`
2. creazione del VCF dal multiallineamento
3. pulitura del VCF
4. kmer counting con KMC
5. genotipizzazione con MALVA

## Container Docker per flask+conda

### Prerequisiti

* **Docker**  
  Installazione su Ubuntu
```
curl -fsSL https://download.docker.com/linux/ubuntu/gpg | sudo apt-key add -
sudo add-apt-repository \
   "deb [arch=amd64] https://download.docker.com/linux/ubuntu \
   $(lsb_release -cs) \
   stable"
sudo apt-get update
sudo apt-get install docker-ce docker-ce-cli containerd.io
# Opzionale: Per usare Docker senza essere root
# (ATTENZIONE: utenti nel gruppo docker hanno essenzialmente le capabilities di root!!!)
sudo usermod -aG docker $USER
newgrp docker  # o logout+login
# Fine parte opzionale

docker run hello-world
```

### Esecuzione del backend
```
./run-backend.sh
```
Il backend è accessibile a `http://localhost:56733/`

### Struttura delle directory

```
.
├── flask         # Applicazione flask. Montata su /app nel container
│   ├── app
│   │   ├── templates
│   │   │   └── home.html
│   │   ├── __init__.py
│   │   └── views.py
│   ├── main.py
│   └── uwsgi.ini
├── snakemake     # Directory per snakemake. Montata su /snakemake nel container
│   ├── example
│   │   ├── references.fa
│   │   └── sample.fq
│   ├── config.yaml
│   └── Snakefile
├── static        # Directory per asset statici. Montata su /app/static nel container.
│   │             # Accessibile con /static nel webserver
│   └── index.html
├── api_doc.md
├── Dockerfile
├── environment.yml       # Dipendenze dell'environment conda. Dopo modifiche a questo file si deve `docker rm backend + ./run-backend.sh`
├── README.md             # This file ;-)
├── autoreload-flask.sh   # Esegue il reload dell'applicazione flask quando un file viene aggiunto/modificato/cancellato nella cartella flask
└── run-backend.sh        # Mette in esecuzione in backend tramite Docker.
```


## Snakefile
#### HowTo
Le pipeline è divisa in due snakefile: `Snakefile.vcf` per la creazione del vcf e dello pseudo reference e `Snakefile.malva` per lanciare KMC e malva.

Ogni snakefile ha il suo file di configurazione.

Prima di lanciare `Snakefile.vcf` settare in `config.vcf.yaml' le seguenti variabili:
* `workdir`: directory dove si vogliono tutti i file.  Idealmente questo valore è il jobid, quindi dovrebbe essere univoco per ogni run.
* `multifa`: references da cui creare il vcf

Prima di lanciare `Snakefile.malva` settare in `config.malva.yaml` le seguenti variabili:
* `workdir`: directory dove si vogliono tutti i file.  Anche questo valore dovrebbe essere univoco su tutte le run.
* `refrence`: path allo pseudoreference da usare in malva.
* `vcf`: path al vcf da usare in malva.
* `sample`: path al file contenente le read da usare.

Una volta settate le variabili si può lanciare la pipeline che si vuole con
```bash
snakemake --snakefile=<nome_snakefile>

# Se non fosse chiaro, per lanciare la creazione di ref e vcf usare
snakemake --snakefile=Snakefile.vcf

# Mentre per lanciare kmc e malva usare
snakemake --snakefile=Snakfile.malva

```

Ho caricato dei file di esempio.

#### Fixme/Todo
* tutti i path ai tool/script sono hardcoded per farlo funzionare su mendel (container scc)
* la maggior parte dei tool sono disponibili su conda. Per snp-sites sto usando un mio fork con modifiche per far scrivere su file lo pseudoreference
* è quasi tutto hardcoded (threads e parametri per KMC e malva). Potremmo lasciare l'utente libero di cambiare alcuni dei parametri tramite "interfaccia"
* ~~per KMC il sample va indicato con `-f<a/q/m/bam>` sulla base del tipo~~
