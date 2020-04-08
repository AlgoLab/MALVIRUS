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
* ~~per KMC il sample va indicato con `-f<a/q/m/bam>` sulla base del tipo~~
