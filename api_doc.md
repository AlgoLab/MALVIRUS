# Endpoint /vcf

## GET /vcf 
Get the full list of VCFs available for MALVIRUS

### Request example
```bash
curl -i http://localhost:56733/api/vcf
```
### Return example
```json
{
   "content":[
      {
         "alias":"Fasta",
         "description":"description-fasta",
         "filename":"/jobs/vcf/2020-04-14-15-29-14_9c0554dd-1b54-45f2-b987-183f93bd4e91/references.fa",
         "id":"2020-04-14-15-29-14_9c0554dd-1b54-45f2-b987-183f93bd4e91",
         "params":{
            "cores":"5"
         },
         "status":"Completed"
      },
      {
         "alias":"2020-04-14-15-28-25_2afbc84b-9fa9-4c8f-9ec7-9b76656f29db",
         "description":"description-vcf",
         "filename":"/jobs/vcf/2020-04-14-15-28-25_2afbc84b-9fa9-4c8f-9ec7-9b76656f29db/test.vcf",
         "id":"2020-04-14-15-28-25_2afbc84b-9fa9-4c8f-9ec7-9b76656f29db",
         "reference":"/jobs/vcf/2020-04-14-15-28-25_2afbc84b-9fa9-4c8f-9ec7-9b76656f29db/test.fasta",
         "status":"Uploaded"
      }
   ]
}
```

# GET /vcf/:id
Get the details of the specified VCF

### Request example
```bash
curl -i http://localhost:56733/api/vcf/2020-04-14-15-29-14_9c0554dd-1b54-45f2-b987-183f93bd4e91

curl -i http://localhost:56733/api/vcf/2020-04-14-15-28-25_2afbc84b-9fa9-4c8f-9ec7-9b76656f29db
```
### Return example
```json
{
   "alias":"Fasta",
   "description":"description-fasta",
   "filename":"/jobs/vcf/2020-04-14-15-29-14_9c0554dd-1b54-45f2-b987-183f93bd4e91/references.fa",
   "id":"2020-04-14-15-29-14_9c0554dd-1b54-45f2-b987-183f93bd4e91",
   "log":{
      "last_time":"2020-04-14 15:29:16",
      "output":{
         "freq_vcf":"/jobs/vcf/2020-04-14-15-29-14_9c0554dd-1b54-45f2-b987-183f93bd4e91/vcf/run.cleaned.vcf"
      },
      "status":"Completed",
      "steps":{
         "mafft":{
            "command":"mafft --auto --thread 5 /jobs/vcf/2020-04-14-15-29-14_9c0554dd-1b54-45f2-b987-183f93bd4e91/references.fa > /jobs/vcf/2020-04-14-15-29-14_9c0554dd-1b54-45f2-b987-183f93bd4e91/mafft/multi_alignment.msa 2> /jobs/vcf/2020-04-14-15-29-14_9c0554dd-1b54-45f2-b987-183f93bd4e91/mafft/mafft.log",
            "config":{
               "multifa":"/jobs/vcf/2020-04-14-15-29-14_9c0554dd-1b54-45f2-b987-183f93bd4e91/references.fa",
               "workdir":"/jobs/vcf/2020-04-14-15-29-14_9c0554dd-1b54-45f2-b987-183f93bd4e91"
            },
            "input":{
               "fa":"/jobs/vcf/2020-04-14-15-29-14_9c0554dd-1b54-45f2-b987-183f93bd4e91/references.fa"
            },
            "output":{
               "msa":"/jobs/vcf/2020-04-14-15-29-14_9c0554dd-1b54-45f2-b987-183f93bd4e91/mafft/multi_alignment.msa"
            },
            "params":{

            },
            "result":"Success",
            "return_code":0,
            "time":"2020-04-14 15:29:15"
         },
         "snpsites":{
            "command":"snp-sites -rmcv -o /jobs/vcf/2020-04-14-15-29-14_9c0554dd-1b54-45f2-b987-183f93bd4e91/snpsites/run /jobs/vcf/2020-04-14-15-29-14_9c0554dd-1b54-45f2-b987-183f93bd4e91/mafft/multi_alignment.msa &> /jobs/vcf/2020-04-14-15-29-14_9c0554dd-1b54-45f2-b987-183f93bd4e91/snpsites/snpsites.log",
            "config":{
               "multifa":"/jobs/vcf/2020-04-14-15-29-14_9c0554dd-1b54-45f2-b987-183f93bd4e91/references.fa",
               "workdir":"/jobs/vcf/2020-04-14-15-29-14_9c0554dd-1b54-45f2-b987-183f93bd4e91"
            },
            "input":{
               "msa":"/jobs/vcf/2020-04-14-15-29-14_9c0554dd-1b54-45f2-b987-183f93bd4e91/mafft/multi_alignment.msa"
            },
            "output":{
               "ref":"/jobs/vcf/2020-04-14-15-29-14_9c0554dd-1b54-45f2-b987-183f93bd4e91/snpsites/run.pseudoreference.fa",
               "snps":"/jobs/vcf/2020-04-14-15-29-14_9c0554dd-1b54-45f2-b987-183f93bd4e91/snpsites/run.vcf"
            },
            "params":{
               "prefix":"/jobs/vcf/2020-04-14-15-29-14_9c0554dd-1b54-45f2-b987-183f93bd4e91/snpsites/run"
            },
            "result":"Success",
            "return_code":0,
            "time":"2020-04-14 15:29:16"
         },
         "vcf_add_freqs":{
            "command":"format_vcf.py freq /jobs/vcf/2020-04-14-15-29-14_9c0554dd-1b54-45f2-b987-183f93bd4e91/vcf/run.1.vcf > /jobs/vcf/2020-04-14-15-29-14_9c0554dd-1b54-45f2-b987-183f93bd4e91/vcf/run.cleaned.vcf 2> /jobs/vcf/2020-04-14-15-29-14_9c0554dd-1b54-45f2-b987-183f93bd4e91/vcf/vcf_clean.2.log",
            "config":{
               "multifa":"/jobs/vcf/2020-04-14-15-29-14_9c0554dd-1b54-45f2-b987-183f93bd4e91/references.fa",
               "workdir":"/jobs/vcf/2020-04-14-15-29-14_9c0554dd-1b54-45f2-b987-183f93bd4e91"
            },
            "input":{
               "clean_vcf":"/jobs/vcf/2020-04-14-15-29-14_9c0554dd-1b54-45f2-b987-183f93bd4e91/vcf/run.1.vcf"
            },
            "output":{
               "freq_vcf":"/jobs/vcf/2020-04-14-15-29-14_9c0554dd-1b54-45f2-b987-183f93bd4e91/vcf/run.cleaned.vcf"
            },
            "params":{

            },
            "result":"Success",
            "return_code":0,
            "time":"2020-04-14 15:29:16"
         },
         "vcf_clean_header":{
            "command":"format_vcf.py clean /jobs/vcf/2020-04-14-15-29-14_9c0554dd-1b54-45f2-b987-183f93bd4e91/snpsites/run.vcf > /jobs/vcf/2020-04-14-15-29-14_9c0554dd-1b54-45f2-b987-183f93bd4e91/vcf/run.1.vcf 2> /jobs/vcf/2020-04-14-15-29-14_9c0554dd-1b54-45f2-b987-183f93bd4e91/vcf/vcf_clean.1.log",
            "config":{
               "multifa":"/jobs/vcf/2020-04-14-15-29-14_9c0554dd-1b54-45f2-b987-183f93bd4e91/references.fa",
               "workdir":"/jobs/vcf/2020-04-14-15-29-14_9c0554dd-1b54-45f2-b987-183f93bd4e91"
            },
            "input":{
               "base_vcf":"/jobs/vcf/2020-04-14-15-29-14_9c0554dd-1b54-45f2-b987-183f93bd4e91/snpsites/run.vcf"
            },
            "output":{
               "clean_vcf":"/jobs/vcf/2020-04-14-15-29-14_9c0554dd-1b54-45f2-b987-183f93bd4e91/vcf/run.1.vcf"
            },
            "params":{

            },
            "result":"Success",
            "return_code":0,
            "time":"2020-04-14 15:29:16"
         }
      }
   },
   "params":{
      "cores":"5"
   }
}
```

```json
{
   "alias":"2020-04-14-15-28-25_2afbc84b-9fa9-4c8f-9ec7-9b76656f29db",
   "description":"description-vcf",
   "filename":"/jobs/vcf/2020-04-14-15-28-25_2afbc84b-9fa9-4c8f-9ec7-9b76656f29db/test.vcf",
   "id":"2020-04-14-15-28-25_2afbc84b-9fa9-4c8f-9ec7-9b76656f29db",
   "log":{
      "last_time":"2020-04-14 15:28:25",
      "path":{
         "reference":"/jobs/vcf/2020-04-14-15-28-25_2afbc84b-9fa9-4c8f-9ec7-9b76656f29db/test.fasta",
         "vcf":"/jobs/vcf/2020-04-14-15-28-25_2afbc84b-9fa9-4c8f-9ec7-9b76656f29db/test.vcf"
      },
      "status":"Uploaded"
   },
   "reference":"/jobs/vcf/2020-04-14-15-28-25_2afbc84b-9fa9-4c8f-9ec7-9b76656f29db/test.fasta"
}
```

# POST /vcf
Upload a new precompiled VCF or a FASTA of references to compute a VCF from.

### Request documentation
The form should submit the `file`, a value `filetype=vcf/fasta` and a `description`. A missing or illegal filetype will result in a 400.
For a `typefile=fasta`, also a value `cores` must be submitted.
For a `typefile=vcf`, also a file `reference` must be submitted.
It is possible to submit an `alias` for display, otherwise a the id will be set as alias.

### Request example
```bash
curl -i -F 'filetype=fasta' -F 'description=description-fasta' -F "file=@snakemake/example/references.fa" -F "cores=5" http://localhost:56733/api/vcf -F "alias=Fasta"

curl -i -F 'filetype=vcf' -F 'description=description-vcf' -F "file=@test.vcf" -F "reference=@test.fasta" http://localhost:56733/api/vcf
```
### Return example
Good:
```json
{
   "alias":"2020-04-14-15-28-25_2afbc84b-9fa9-4c8f-9ec7-9b76656f29db",
   "description":"description-vcf",
   "filename":"/jobs/vcf/2020-04-14-15-28-25_2afbc84b-9fa9-4c8f-9ec7-9b76656f29db/test.vcf",
   "id":"2020-04-14-15-28-25_2afbc84b-9fa9-4c8f-9ec7-9b76656f29db",
   "reference":"/jobs/vcf/2020-04-14-15-28-25_2afbc84b-9fa9-4c8f-9ec7-9b76656f29db/test.fasta",
   "status":"Uploaded"
}
```
```json
{
   "alias":"Fasta",
   "description":"description-fasta",
   "filename":"/jobs/vcf/2020-04-14-15-29-14_9c0554dd-1b54-45f2-b987-183f93bd4e91/references.fa",
   "id":"2020-04-14-15-29-14_9c0554dd-1b54-45f2-b987-183f93bd4e91",
   "params":{
      "cores":"5"
   },
   "status":"Running"
}
```

Bad:
```
HTTP/1.0 400 BAD REQUEST
Content-Type: application/json
Content-Length: 47
Server: Werkzeug/1.0.1 Python/3.6.9
Date: Wed, 08 Apr 2020 10:10:10 GMT

{
  "message": "Illegal or missing filetype"
}
```

# Endpoint /malva

## GET /malva
Get the full list of jobs executed / in progress

### Request example
```bash
curl -i http://localhost:56733/api/malva
```
### Return example
```json
{
   "content":[
      {
         "alias":"job-malva",
         "description":"None",
         "filename":"/jobs/malva/2020-04-14-15-36-43_d3b467ab-78a0-4644-9725-b7f5fb6da8dc/sample.fq",
         "id":"2020-04-14-15-36-43_d3b467ab-78a0-4644-9725-b7f5fb6da8dc",
         "input":{
            "reference":"/jobs/vcf/2020-04-14-15-29-14_9c0554dd-1b54-45f2-b987-183f93bd4e91/snpsites/run.pseudoreference.fa",
            "vcf":"/jobs/vcf/2020-04-14-15-29-14_9c0554dd-1b54-45f2-b987-183f93bd4e91/vcf/run.cleaned.vcf"
         },
         "params":{
            "cores":"4",
            "lenkmers":"35",
            "maxmem":"4",
            "maxocc":"300",
            "minocc":"100",
            "vcf":"2020-04-14-15-29-14_9c0554dd-1b54-45f2-b987-183f93bd4e91"
         },
         "status":"Completed"
      },
      {
         "alias":"job-malva-upload",
         "description":"this will fail",
         "filename":"/jobs/malva/2020-04-14-15-38-43_21d81631-04c0-4dd2-80fd-b317220ec347/sample.fq",
         "id":"2020-04-14-15-38-43_21d81631-04c0-4dd2-80fd-b317220ec347",
         "input":{
            "reference":"/jobs/vcf/2020-04-14-15-28-25_2afbc84b-9fa9-4c8f-9ec7-9b76656f29db/test.fasta",
            "vcf":"/jobs/vcf/2020-04-14-15-28-25_2afbc84b-9fa9-4c8f-9ec7-9b76656f29db/test.vcf"
         },
         "params":{
            "cores":"4",
            "lenkmers":"35",
            "maxmem":"4",
            "maxocc":"300",
            "minocc":"100",
            "vcf":"2020-04-14-15-28-25_2afbc84b-9fa9-4c8f-9ec7-9b76656f29db"
         },
         "status":"Failed"
      }
   ]
}
```

# GET /malva/:id
Get the details of the specified job

### Request example
```bash
curl -i http://localhost:56733/api/malva/2020-04-14-15-36-43_d3b467ab-78a0-4644-9725-b7f5fb6da8dc

curl -i http://localhost:56733/api/malva/2020-04-14-15-38-43_21d81631-04c0-4dd2-80fd-b317220ec347
```
### Return example
```json
{
   "alias":"job-malva",
   "description":"None",
   "filename":"/jobs/malva/2020-04-14-15-36-43_d3b467ab-78a0-4644-9725-b7f5fb6da8dc/sample.fq",
   "id":"2020-04-14-15-36-43_d3b467ab-78a0-4644-9725-b7f5fb6da8dc",
   "input":{
      "reference":"/jobs/vcf/2020-04-14-15-29-14_9c0554dd-1b54-45f2-b987-183f93bd4e91/snpsites/run.pseudoreference.fa",
      "vcf":"/jobs/vcf/2020-04-14-15-29-14_9c0554dd-1b54-45f2-b987-183f93bd4e91/vcf/run.cleaned.vcf"
   },
   "log":{
      "last_time":"2020-04-14 15:36:48",
      "output":{
         "vcf":"/jobs/malva/2020-04-14-15-36-43_d3b467ab-78a0-4644-9725-b7f5fb6da8dc/malva/malva.vcf"
      },
      "status":"Completed",
      "steps":{
         "KMC":{
            "command":"kmc -t4 -m4 -k35 -ci100 -cs300 -fm /jobs/malva/2020-04-14-15-36-43_d3b467ab-78a0-4644-9725-b7f5fb6da8dc/sample.fq /jobs/malva/2020-04-14-15-36-43_d3b467ab-78a0-4644-9725-b7f5fb6da8dc/KMC/kmers /jobs/malva/2020-04-14-15-36-43_d3b467ab-78a0-4644-9725-b7f5fb6da8dc/KMC/tmp &> /jobs/malva/2020-04-14-15-36-43_d3b467ab-78a0-4644-9725-b7f5fb6da8dc/KMC/kmc.log",
            "config":{
               "cores":4,
               "lenkmers":35,
               "malvak":35,
               "maxmem":4,
               "maxocc":300,
               "minocc":100,
               "reference":"/jobs/vcf/2020-04-14-15-29-14_9c0554dd-1b54-45f2-b987-183f93bd4e91/snpsites/run.pseudoreference.fa",
               "sample":"/jobs/malva/2020-04-14-15-36-43_d3b467ab-78a0-4644-9725-b7f5fb6da8dc/sample.fq",
               "vcf":"/jobs/vcf/2020-04-14-15-29-14_9c0554dd-1b54-45f2-b987-183f93bd4e91/vcf/run.cleaned.vcf",
               "workdir":"/jobs/malva/2020-04-14-15-36-43_d3b467ab-78a0-4644-9725-b7f5fb6da8dc"
            },
            "input":{
               "sample":"/jobs/malva/2020-04-14-15-36-43_d3b467ab-78a0-4644-9725-b7f5fb6da8dc/sample.fq"
            },
            "output":{
               "kmc_out":"/jobs/malva/2020-04-14-15-36-43_d3b467ab-78a0-4644-9725-b7f5fb6da8dc/KMC/kmers.kmc_pre"
            },
            "params":{
               "kmc_prefix":"/jobs/malva/2020-04-14-15-36-43_d3b467ab-78a0-4644-9725-b7f5fb6da8dc/KMC/kmers",
               "kmc_tmp":"/jobs/malva/2020-04-14-15-36-43_d3b467ab-78a0-4644-9725-b7f5fb6da8dc/KMC/tmp",
               "lenkmers":35,
               "maxmem":4,
               "maxocc":300,
               "minocc":100
            },
            "result":"Success",
            "return_code":0,
            "time":"2020-04-14 15:36:45"
         },
         "malva":{
            "command":"malva-geno -1 -k 35 -r 35 -c 300 -b 1 /jobs/vcf/2020-04-14-15-29-14_9c0554dd-1b54-45f2-b987-183f93bd4e91/snpsites/run.pseudoreference.fa /jobs/vcf/2020-04-14-15-29-14_9c0554dd-1b54-45f2-b987-183f93bd4e91/vcf/run.cleaned.vcf /jobs/malva/2020-04-14-15-36-43_d3b467ab-78a0-4644-9725-b7f5fb6da8dc/KMC/kmers > /jobs/malva/2020-04-14-15-36-43_d3b467ab-78a0-4644-9725-b7f5fb6da8dc/malva/malva.vcf 2> /jobs/malva/2020-04-14-15-36-43_d3b467ab-78a0-4644-9725-b7f5fb6da8dc/malva/malva.log",
            "config":{
               "cores":4,
               "lenkmers":35,
               "malvak":35,
               "maxmem":4,
               "maxocc":300,
               "minocc":100,
               "reference":"/jobs/vcf/2020-04-14-15-29-14_9c0554dd-1b54-45f2-b987-183f93bd4e91/snpsites/run.pseudoreference.fa",
               "sample":"/jobs/malva/2020-04-14-15-36-43_d3b467ab-78a0-4644-9725-b7f5fb6da8dc/sample.fq",
               "vcf":"/jobs/vcf/2020-04-14-15-29-14_9c0554dd-1b54-45f2-b987-183f93bd4e91/vcf/run.cleaned.vcf",
               "workdir":"/jobs/malva/2020-04-14-15-36-43_d3b467ab-78a0-4644-9725-b7f5fb6da8dc"
            },
            "input":{
               "kmc":"/jobs/malva/2020-04-14-15-36-43_d3b467ab-78a0-4644-9725-b7f5fb6da8dc/KMC/kmers.kmc_pre",
               "ref":"/jobs/vcf/2020-04-14-15-29-14_9c0554dd-1b54-45f2-b987-183f93bd4e91/snpsites/run.pseudoreference.fa",
               "vcf":"/jobs/vcf/2020-04-14-15-29-14_9c0554dd-1b54-45f2-b987-183f93bd4e91/vcf/run.cleaned.vcf"
            },
            "output":{
               "vcf":"/jobs/malva/2020-04-14-15-36-43_d3b467ab-78a0-4644-9725-b7f5fb6da8dc/malva/malva.vcf"
            },
            "params":{
               "c":300,
               "k":35,
               "kmc_prefix":"/jobs/malva/2020-04-14-15-36-43_d3b467ab-78a0-4644-9725-b7f5fb6da8dc/KMC/kmers",
               "r":35
            },
            "result":"Success",
            "return_code":0,
            "time":"2020-04-14 15:36:48"
         }
      }
   },
   "params":{
      "cores":"4",
      "lenkmers":"35",
      "maxmem":"4",
      "maxocc":"300",
      "minocc":"100",
      "vcf":"2020-04-14-15-29-14_9c0554dd-1b54-45f2-b987-183f93bd4e91"
   }
}
```

```json
{
   "alias":"job-malva-upload",
   "description":"this will fail",
   "filename":"/jobs/malva/2020-04-14-15-38-43_21d81631-04c0-4dd2-80fd-b317220ec347/sample.fq",
   "id":"2020-04-14-15-38-43_21d81631-04c0-4dd2-80fd-b317220ec347",
   "input":{
      "reference":"/jobs/vcf/2020-04-14-15-28-25_2afbc84b-9fa9-4c8f-9ec7-9b76656f29db/test.fasta",
      "vcf":"/jobs/vcf/2020-04-14-15-28-25_2afbc84b-9fa9-4c8f-9ec7-9b76656f29db/test.vcf"
   },
   "log":{
      "last_time":"2020-04-14 15:38:49",
      "status":"Failed",
      "steps":{
         "KMC":{
            "command":"kmc -t4 -m4 -k35 -ci100 -cs300 -fm /jobs/malva/2020-04-14-15-38-43_21d81631-04c0-4dd2-80fd-b317220ec347/sample.fq /jobs/malva/2020-04-14-15-38-43_21d81631-04c0-4dd2-80fd-b317220ec347/KMC/kmers /jobs/malva/2020-04-14-15-38-43_21d81631-04c0-4dd2-80fd-b317220ec347/KMC/tmp &> /jobs/malva/2020-04-14-15-38-43_21d81631-04c0-4dd2-80fd-b317220ec347/KMC/kmc.log",
            "config":{
               "cores":4,
               "lenkmers":35,
               "malvak":35,
               "maxmem":4,
               "maxocc":300,
               "minocc":100,
               "reference":"/jobs/vcf/2020-04-14-15-28-25_2afbc84b-9fa9-4c8f-9ec7-9b76656f29db/test.fasta",
               "sample":"/jobs/malva/2020-04-14-15-38-43_21d81631-04c0-4dd2-80fd-b317220ec347/sample.fq",
               "vcf":"/jobs/vcf/2020-04-14-15-28-25_2afbc84b-9fa9-4c8f-9ec7-9b76656f29db/test.vcf",
               "workdir":"/jobs/malva/2020-04-14-15-38-43_21d81631-04c0-4dd2-80fd-b317220ec347"
            },
            "input":{
               "sample":"/jobs/malva/2020-04-14-15-38-43_21d81631-04c0-4dd2-80fd-b317220ec347/sample.fq"
            },
            "output":{
               "kmc_out":"/jobs/malva/2020-04-14-15-38-43_21d81631-04c0-4dd2-80fd-b317220ec347/KMC/kmers.kmc_pre"
            },
            "params":{
               "kmc_prefix":"/jobs/malva/2020-04-14-15-38-43_21d81631-04c0-4dd2-80fd-b317220ec347/KMC/kmers",
               "kmc_tmp":"/jobs/malva/2020-04-14-15-38-43_21d81631-04c0-4dd2-80fd-b317220ec347/KMC/tmp",
               "lenkmers":35,
               "maxmem":4,
               "maxocc":300,
               "minocc":100
            },
            "result":"Success",
            "return_code":0,
            "time":"2020-04-14 15:38:45"
         },
         "malva":{
            "command":"malva-geno -1 -k 35 -r 35 -c 300 -b 1 /jobs/vcf/2020-04-14-15-28-25_2afbc84b-9fa9-4c8f-9ec7-9b76656f29db/test.fasta /jobs/vcf/2020-04-14-15-28-25_2afbc84b-9fa9-4c8f-9ec7-9b76656f29db/test.vcf /jobs/malva/2020-04-14-15-38-43_21d81631-04c0-4dd2-80fd-b317220ec347/KMC/kmers > /jobs/malva/2020-04-14-15-38-43_21d81631-04c0-4dd2-80fd-b317220ec347/malva/malva.vcf 2> /jobs/malva/2020-04-14-15-38-43_21d81631-04c0-4dd2-80fd-b317220ec347/malva/malva.log",
            "config":{
               "cores":4,
               "lenkmers":35,
               "malvak":35,
               "maxmem":4,
               "maxocc":300,
               "minocc":100,
               "reference":"/jobs/vcf/2020-04-14-15-28-25_2afbc84b-9fa9-4c8f-9ec7-9b76656f29db/test.fasta",
               "sample":"/jobs/malva/2020-04-14-15-38-43_21d81631-04c0-4dd2-80fd-b317220ec347/sample.fq",
               "vcf":"/jobs/vcf/2020-04-14-15-28-25_2afbc84b-9fa9-4c8f-9ec7-9b76656f29db/test.vcf",
               "workdir":"/jobs/malva/2020-04-14-15-38-43_21d81631-04c0-4dd2-80fd-b317220ec347"
            },
            "input":{
               "kmc":"/jobs/malva/2020-04-14-15-38-43_21d81631-04c0-4dd2-80fd-b317220ec347/KMC/kmers.kmc_pre",
               "ref":"/jobs/vcf/2020-04-14-15-28-25_2afbc84b-9fa9-4c8f-9ec7-9b76656f29db/test.fasta",
               "vcf":"/jobs/vcf/2020-04-14-15-28-25_2afbc84b-9fa9-4c8f-9ec7-9b76656f29db/test.vcf"
            },
            "output":{
               "vcf":"/jobs/malva/2020-04-14-15-38-43_21d81631-04c0-4dd2-80fd-b317220ec347/malva/malva.vcf"
            },
            "params":{
               "c":300,
               "k":35,
               "kmc_prefix":"/jobs/malva/2020-04-14-15-38-43_21d81631-04c0-4dd2-80fd-b317220ec347/KMC/kmers",
               "r":35
            },
            "result":"Failed",
            "return_code":134,
            "time":"2020-04-14 15:38:49"
         }
      }
   },
   "params":{
      "cores":"4",
      "lenkmers":"35",
      "maxmem":"4",
      "maxocc":"300",
      "minocc":"100",
      "vcf":"2020-04-14-15-28-25_2afbc84b-9fa9-4c8f-9ec7-9b76656f29db"
   }
}

```
# POST /malva
Upload a new precompiled VCF or a FASTA of references to compute a VCF from.

### Request documentation
The form should submit the arguments needed for configuration:

- `sample`: FASTQ sample to run MALVIRUS on
- `minocc`: Minimum occurrence of kmers / alleles
- `maxocc`: Maximum occurrence of kmers / alleles
- `lenkmers`: Dimension of k-mer
- `maxmem`: Max memory for KMC (GB)
- `cores`: Number of cores to use

It is possible to submit an `alias` for display, otherwise a the id will be set as alias.

### Request example
```bash
curl -i \
-F 'sample=@snakemake/example/sample.fq' \
-F 'vcf=2020-04-14-15-29-14_9c0554dd-1b54-45f2-b987-183f93bd4e91' \
-F 'minocc=100' \
-F 'maxocc=300' \
-F 'lenkmers=35' \
-F 'maxmem=4' \
-F 'cores=4' \
-F 'alias=job-malva' \
http://localhost:56733/api/malva


curl -i \
-F 'sample=@snakemake/example/sample.fq' \
-F 'vcf=2020-04-14-15-28-25_2afbc84b-9fa9-4c8f-9ec7-9b76656f29db' \
-F 'minocc=100' \
-F 'maxocc=300' \
-F 'lenkmers=35' \
-F 'maxmem=4' \
-F 'cores=4' \
-F 'alias=job-malva-upload' \
-F 'description=this will fail' \
http://localhost:56733/api/malva
```
### Return example

```json
{
   "alias":"job-malva",
   "description":"None",
   "filename":"/jobs/malva/2020-04-14-15-36-43_d3b467ab-78a0-4644-9725-b7f5fb6da8dc/sample.fq",
   "id":"2020-04-14-15-36-43_d3b467ab-78a0-4644-9725-b7f5fb6da8dc",
   "input":{
      "reference":"/jobs/vcf/2020-04-14-15-29-14_9c0554dd-1b54-45f2-b987-183f93bd4e91/snpsites/run.pseudoreference.fa",
      "vcf":"/jobs/vcf/2020-04-14-15-29-14_9c0554dd-1b54-45f2-b987-183f93bd4e91/vcf/run.cleaned.vcf"
   },
   "params":{
      "cores":"4",
      "lenkmers":"35",
      "maxmem":"4",
      "maxocc":"300",
      "minocc":"100",
      "vcf":"2020-04-14-15-29-14_9c0554dd-1b54-45f2-b987-183f93bd4e91"
   },
   "status":"Running"
}
```

```json
{
   "alias":"job-malva-upload",
   "description":"this will fail",
   "filename":"/jobs/malva/2020-04-14-15-38-43_21d81631-04c0-4dd2-80fd-b317220ec347/sample.fq",
   "id":"2020-04-14-15-38-43_21d81631-04c0-4dd2-80fd-b317220ec347",
   "input":{
      "reference":"/jobs/vcf/2020-04-14-15-28-25_2afbc84b-9fa9-4c8f-9ec7-9b76656f29db/test.fasta",
      "vcf":"/jobs/vcf/2020-04-14-15-28-25_2afbc84b-9fa9-4c8f-9ec7-9b76656f29db/test.vcf"
   },
   "params":{
      "cores":"4",
      "lenkmers":"35",
      "maxmem":"4",
      "maxocc":"300",
      "minocc":"100",
      "vcf":"2020-04-14-15-28-25_2afbc84b-9fa9-4c8f-9ec7-9b76656f29db"
   },
   "status":"Running"
}
```