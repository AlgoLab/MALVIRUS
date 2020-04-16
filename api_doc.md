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
   "content": [
      {
         "alias": "Fasta",
         "description": "description-fasta",
         "filename": "/jobs/vcf/20200415-073411_9fa3556d-80d4-4742-87c4-7a0bd0f484e4/references.fa",
         "id": "20200415-073411_9fa3556d-80d4-4742-87c4-7a0bd0f484e4",
         "params": {
            "cores": "5"
         },
         "status": "Completed"
      },
      {
         "alias": "20200415-073451_dca8c691-4b79-405b-96a6-755d8adeebc3",
         "description": "description-vcf",
         "filename": "/jobs/vcf/20200415-073451_dca8c691-4b79-405b-96a6-755d8adeebc3/test.vcf",
         "id": "20200415-073451_dca8c691-4b79-405b-96a6-755d8adeebc3",
         "reference": "/jobs/vcf/20200415-073451_dca8c691-4b79-405b-96a6-755d8adeebc3/test.fasta",
         "status": "Uploaded"
      }
   ]
}```

## GET /vcf/:id
Get the details of the specified VCF

### Request example
```bash
curl -i http://localhost:56733/api/vcf/20200415-073411_9fa3556d-80d4-4742-87c4-7a0bd0f484e4

curl -i http://localhost:56733/api/vcf/20200415-073451_dca8c691-4b79-405b-96a6-755d8adeebc3
```
### Return example
```json
{
   "alias": "Fasta",
   "description": "description-fasta",
   "filename": "/jobs/vcf/20200415-073411_9fa3556d-80d4-4742-87c4-7a0bd0f484e4/references.fa",
   "id": "20200415-073411_9fa3556d-80d4-4742-87c4-7a0bd0f484e4",
   "log": {
      "last_time": "2020-04-15 07:34:14",
      "output": {
         "freq_vcf": "/jobs/vcf/20200415-073411_9fa3556d-80d4-4742-87c4-7a0bd0f484e4/vcf/run.cleaned.vcf"
      },
      "status": "Completed",
      "steps": {
         "mafft": {
            "command": "mafft --auto --thread 5 /jobs/vcf/20200415-073411_9fa3556d-80d4-4742-87c4-7a0bd0f484e4/references.fa > /jobs/vcf/20200415-073411_9fa3556d-80d4-4742-87c4-7a0bd0f484e4/mafft/multi_alignment.msa 2> /jobs/vcf/20200415-073411_9fa3556d-80d4-4742-87c4-7a0bd0f484e4/mafft/mafft.log",
            "config": {
               "multifa": "/jobs/vcf/20200415-073411_9fa3556d-80d4-4742-87c4-7a0bd0f484e4/references.fa",
               "workdir": "/jobs/vcf/20200415-073411_9fa3556d-80d4-4742-87c4-7a0bd0f484e4"
            },
            "input": {
               "fa": "/jobs/vcf/20200415-073411_9fa3556d-80d4-4742-87c4-7a0bd0f484e4/references.fa"
            },
            "output": {
               "msa": "/jobs/vcf/20200415-073411_9fa3556d-80d4-4742-87c4-7a0bd0f484e4/mafft/multi_alignment.msa"
            },
            "params": {},
            "result": "Success",
            "return_code": 0,
            "time": "2020-04-15 07:34:13"
         },
         "snpsites": {
            "command": "snp-sites -rmcv -o /jobs/vcf/20200415-073411_9fa3556d-80d4-4742-87c4-7a0bd0f484e4/snpsites/run /jobs/vcf/20200415-073411_9fa3556d-80d4-4742-87c4-7a0bd0f484e4/mafft/multi_alignment.msa &> /jobs/vcf/20200415-073411_9fa3556d-80d4-4742-87c4-7a0bd0f484e4/snpsites/snpsites.log",
            "config": {
               "multifa": "/jobs/vcf/20200415-073411_9fa3556d-80d4-4742-87c4-7a0bd0f484e4/references.fa",
               "workdir": "/jobs/vcf/20200415-073411_9fa3556d-80d4-4742-87c4-7a0bd0f484e4"
            },
            "input": {
               "msa": "/jobs/vcf/20200415-073411_9fa3556d-80d4-4742-87c4-7a0bd0f484e4/mafft/multi_alignment.msa"
            },
            "output": {
               "ref": "/jobs/vcf/20200415-073411_9fa3556d-80d4-4742-87c4-7a0bd0f484e4/snpsites/run.pseudoreference.fa",
               "snps": "/jobs/vcf/20200415-073411_9fa3556d-80d4-4742-87c4-7a0bd0f484e4/snpsites/run.vcf"
            },
            "params": {
               "prefix": "/jobs/vcf/20200415-073411_9fa3556d-80d4-4742-87c4-7a0bd0f484e4/snpsites/run"
            },
            "result": "Success",
            "return_code": 0,
            "time": "2020-04-15 07:34:13"
         },
         "vcf_add_freqs": {
            "command": "format_vcf.py freq /jobs/vcf/20200415-073411_9fa3556d-80d4-4742-87c4-7a0bd0f484e4/vcf/run.1.vcf > /jobs/vcf/20200415-073411_9fa3556d-80d4-4742-87c4-7a0bd0f484e4/vcf/run.cleaned.vcf 2> /jobs/vcf/20200415-073411_9fa3556d-80d4-4742-87c4-7a0bd0f484e4/vcf/vcf_clean.2.log",
            "config": {
               "multifa": "/jobs/vcf/20200415-073411_9fa3556d-80d4-4742-87c4-7a0bd0f484e4/references.fa",
               "workdir": "/jobs/vcf/20200415-073411_9fa3556d-80d4-4742-87c4-7a0bd0f484e4"
            },
            "input": {
               "clean_vcf": "/jobs/vcf/20200415-073411_9fa3556d-80d4-4742-87c4-7a0bd0f484e4/vcf/run.1.vcf"
            },
            "output": {
               "freq_vcf": "/jobs/vcf/20200415-073411_9fa3556d-80d4-4742-87c4-7a0bd0f484e4/vcf/run.cleaned.vcf"
            },
            "params": {},
            "result": "Success",
            "return_code": 0,
            "time": "2020-04-15 07:34:14"
         },
         "vcf_clean_header": {
            "command": "format_vcf.py clean /jobs/vcf/20200415-073411_9fa3556d-80d4-4742-87c4-7a0bd0f484e4/snpsites/run.vcf > /jobs/vcf/20200415-073411_9fa3556d-80d4-4742-87c4-7a0bd0f484e4/vcf/run.1.vcf 2> /jobs/vcf/20200415-073411_9fa3556d-80d4-4742-87c4-7a0bd0f484e4/vcf/vcf_clean.1.log",
            "config": {
               "multifa": "/jobs/vcf/20200415-073411_9fa3556d-80d4-4742-87c4-7a0bd0f484e4/references.fa",
               "workdir": "/jobs/vcf/20200415-073411_9fa3556d-80d4-4742-87c4-7a0bd0f484e4"
            },
            "input": {
               "base_vcf": "/jobs/vcf/20200415-073411_9fa3556d-80d4-4742-87c4-7a0bd0f484e4/snpsites/run.vcf"
            },
            "output": {
               "clean_vcf": "/jobs/vcf/20200415-073411_9fa3556d-80d4-4742-87c4-7a0bd0f484e4/vcf/run.1.vcf"
            },
            "params": {},
            "result": "Success",
            "return_code": 0,
            "time": "2020-04-15 07:34:13"
         }
      }
   },
   "params": {
      "cores": "5"
   },
   "snakemake": "==> /jobs/vcf/20200415-073411_9fa3556d-80d4-4742-87c4-7a0bd0f484e4/.snakemake/log/2020-04-15T073412.345533.snakemake.log <==\n\n[Wed Apr 15 07:34:14 2020]\nlocalrule run:\n    input: /jobs/vcf/20200415-073411_9fa3556d-80d4-4742-87c4-7a0bd0f484e4/vcf/run.cleaned.vcf\n    jobid: 0\n\n[Wed Apr 15 07:34:14 2020]\nFinished job 0.\n5 of 5 steps (100%) done\nComplete log: /jobs/vcf/20200415-073411_9fa3556d-80d4-4742-87c4-7a0bd0f484e4/.snakemake/log/2020-04-15T073412.345533.snakemake.log\n"
}
```

```json
{
   "alias": "20200415-073451_dca8c691-4b79-405b-96a6-755d8adeebc3",
   "description": "description-vcf",
   "filename": "/jobs/vcf/20200415-073451_dca8c691-4b79-405b-96a6-755d8adeebc3/test.vcf",
   "id": "20200415-073451_dca8c691-4b79-405b-96a6-755d8adeebc3",
   "log": {
      "last_time": "2020-04-15 07:34:51",
      "output": {
         "reference": "/jobs/vcf/20200415-073451_dca8c691-4b79-405b-96a6-755d8adeebc3/test.fasta",
         "vcf": "/jobs/vcf/20200415-073451_dca8c691-4b79-405b-96a6-755d8adeebc3/test.vcf"
      },
      "status": "Uploaded"
   },
   "reference": "/jobs/vcf/20200415-073451_dca8c691-4b79-405b-96a6-755d8adeebc3/test.fasta",
   "snakemake": ""
}
```

# POST /vcf
Upload a new precompiled VCF or a FASTA of references to compute a VCF from.

### Request documentation
The form should submit the `file`, a value `filetype=vcf/fasta`, a file `reference` and (optionally) a `description` and a `gtf`. A missing or illegal filetype will result in a 400.
For a `typefile=fasta`, also a value `cores` must be submitted.
It is possible to submit an `alias` for display, otherwise a the id will be set as alias.

### Request example
```bash
curl -i \
-F 'filetype=fasta' \
-F 'description=description-fasta' \
-F "file=@snakemake/example/references.fa" \
-F "reference=@test.fasta" \
-F "cores=5" \
-F "alias=Fasta" \
-F "gtf=@test.gtf" \
http://localhost:56733/api/vcf

curl -i \
-F 'filetype=vcf' \
-F 'description=description-vcf' \
-F "file=@test.vcf" \
-F "reference=@test.fasta" \
http://localhost:56733/api/vcf
```
### Return example
Good:
```json
{
   "alias":"Fasta",
   "description":"description-fasta",
   "filename":"/jobs/vcf/20200415-073411_9fa3556d-80d4-4742-87c4-7a0bd0f484e4/references.fa",
   "id":"20200415-073411_9fa3556d-80d4-4742-87c4-7a0bd0f484e4",
   "params":{
      "cores":"5"
   },
   "status":"Running"
}
```
```json
{
   "alias":"20200415-073451_dca8c691-4b79-405b-96a6-755d8adeebc3",
   "description":"description-vcf",
   "filename":"/jobs/vcf/20200415-073451_dca8c691-4b79-405b-96a6-755d8adeebc3/test.vcf",
   "id":"20200415-073451_dca8c691-4b79-405b-96a6-755d8adeebc3",
   "reference":"/jobs/vcf/20200415-073451_dca8c691-4b79-405b-96a6-755d8adeebc3/test.fasta",
   "status":"Uploaded"
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

## DELETE /vcf/
Delete the specified list of VCFs.
Note this will ignore non-existant IDs.

### Request example
```bash
curl -i --header "Content-Type: application/json" \
-X DELETE \
--data '{"id": ["ID1","ID2"]}' \
http://localhost:56733/api/vcf
```
### Return example
```json
```

## DELETE /vcf/:id
Delete the specified VCF

### Request example
```bash
curl -i -X DELETE http://localhost:56733/api/vcf/20200415-151628_99994a9c-fc2c-4bc0-be8b-caa0c914d0b1

curl -i -X DELETE http://localhost:56733/api/vcf/noexists
```
### Return example
Good:
```json
```

Bad:
```json
{
   "message": "ID not found"
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
   "content": [
      {
         "alias": "job-malva-upload",
         "description": "this will fail",
         "filename": "/jobs/malva/20200415-074343_7bfa34ef-67bd-4183-a267-d99dd02b4e95/sample.fq",
         "id": "20200415-074343_7bfa34ef-67bd-4183-a267-d99dd02b4e95",
         "input": {
            "reference": "/jobs/vcf/20200415-073451_dca8c691-4b79-405b-96a6-755d8adeebc3/test.fasta",
            "vcf": "/jobs/vcf/20200415-073451_dca8c691-4b79-405b-96a6-755d8adeebc3/test.vcf"
         },
         "params": {
            "cores": "4",
            "lenkmers": "35",
            "maxmem": "4",
            "maxocc": "300",
            "minocc": "100",
            "vcf": "20200415-073451_dca8c691-4b79-405b-96a6-755d8adeebc3"
         },
         "status": "Failed"
      },
      {
         "alias": "job-malva",
         "description": "None",
         "filename": "/jobs/malva/20200415-074226_3b01e54f-63b6-4f84-9003-30c480777dcb/sample.fq",
         "id": "20200415-074226_3b01e54f-63b6-4f84-9003-30c480777dcb",
         "input": {
            "reference": "/jobs/vcf/20200415-073411_9fa3556d-80d4-4742-87c4-7a0bd0f484e4/snpsites/run.pseudoreference.fa",
            "vcf": "/jobs/vcf/20200415-073411_9fa3556d-80d4-4742-87c4-7a0bd0f484e4/vcf/run.cleaned.vcf"
         },
         "params": {
            "cores": "4",
            "lenkmers": "35",
            "maxmem": "4",
            "maxocc": "300",
            "minocc": "100",
            "vcf": "20200415-073411_9fa3556d-80d4-4742-87c4-7a0bd0f484e4"
         },
         "status": "Completed"
      }
   ]
}
```

# GET /malva/:id
Get the details of the specified job

### Request example
```bash
curl -i http://localhost:56733/api/malva/20200415-074226_3b01e54f-63b6-4f84-9003-30c480777dcb

curl -i http://localhost:56733/api/malva/20200415-074343_7bfa34ef-67bd-4183-a267-d99dd02b4e95
```
### Return example
```json
{
   "alias": "job-malva",
   "description": "None",
   "filename": "/jobs/malva/20200415-074226_3b01e54f-63b6-4f84-9003-30c480777dcb/sample.fq",
   "id": "20200415-074226_3b01e54f-63b6-4f84-9003-30c480777dcb",
   "input": {
      "reference": "/jobs/vcf/20200415-073411_9fa3556d-80d4-4742-87c4-7a0bd0f484e4/snpsites/run.pseudoreference.fa",
      "vcf": "/jobs/vcf/20200415-073411_9fa3556d-80d4-4742-87c4-7a0bd0f484e4/vcf/run.cleaned.vcf"
   },
   "log": {
      "last_time": "2020-04-15 07:42:30",
      "output": {
         "vcf": "/jobs/malva/20200415-074226_3b01e54f-63b6-4f84-9003-30c480777dcb/malva/malva.vcf"
      },
      "status": "Completed",
      "steps": {
         "KMC": {
            "command": "kmc -t4 -m4 -k35 -ci100 -cs300 -fm /jobs/malva/20200415-074226_3b01e54f-63b6-4f84-9003-30c480777dcb/sample.fq /jobs/malva/20200415-074226_3b01e54f-63b6-4f84-9003-30c480777dcb/KMC/kmers /jobs/malva/20200415-074226_3b01e54f-63b6-4f84-9003-30c480777dcb/KMC/tmp &> /jobs/malva/20200415-074226_3b01e54f-63b6-4f84-9003-30c480777dcb/KMC/kmc.log",
            "config": {
               "lenkmers": 35,
               "maxmem": 4,
               "maxocc": 300,
               "minocc": 100,
               "reference": "/jobs/vcf/20200415-073411_9fa3556d-80d4-4742-87c4-7a0bd0f484e4/snpsites/run.pseudoreference.fa",
               "sample": "/jobs/malva/20200415-074226_3b01e54f-63b6-4f84-9003-30c480777dcb/sample.fq",
               "vcf": "/jobs/vcf/20200415-073411_9fa3556d-80d4-4742-87c4-7a0bd0f484e4/vcf/run.cleaned.vcf",
               "workdir": "/jobs/malva/20200415-074226_3b01e54f-63b6-4f84-9003-30c480777dcb"
            },
            "input": {
               "sample": "/jobs/malva/20200415-074226_3b01e54f-63b6-4f84-9003-30c480777dcb/sample.fq"
            },
            "output": {
               "kmc_out": "/jobs/malva/20200415-074226_3b01e54f-63b6-4f84-9003-30c480777dcb/KMC/kmers.kmc_pre"
            },
            "params": {
               "kmc_prefix": "/jobs/malva/20200415-074226_3b01e54f-63b6-4f84-9003-30c480777dcb/KMC/kmers",
               "kmc_tmp": "/jobs/malva/20200415-074226_3b01e54f-63b6-4f84-9003-30c480777dcb/KMC/tmp",
               "lenkmers": 35,
               "maxmem": 4,
               "maxocc": 300,
               "minocc": 100
            },
            "result": "Success",
            "return_code": 0,
            "time": "2020-04-15 07:42:28"
         },
         "malva": {
            "command": "malva-geno -1 -k 35 -r 35 -c 300 -b 1 /jobs/vcf/20200415-073411_9fa3556d-80d4-4742-87c4-7a0bd0f484e4/snpsites/run.pseudoreference.fa /jobs/vcf/20200415-073411_9fa3556d-80d4-4742-87c4-7a0bd0f484e4/vcf/run.cleaned.vcf /jobs/malva/20200415-074226_3b01e54f-63b6-4f84-9003-30c480777dcb/KMC/kmers > /jobs/malva/20200415-074226_3b01e54f-63b6-4f84-9003-30c480777dcb/malva/malva.vcf 2> /jobs/malva/20200415-074226_3b01e54f-63b6-4f84-9003-30c480777dcb/malva/malva.log",
            "config": {
               "lenkmers": 35,
               "maxmem": 4,
               "maxocc": 300,
               "minocc": 100,
               "reference": "/jobs/vcf/20200415-073411_9fa3556d-80d4-4742-87c4-7a0bd0f484e4/snpsites/run.pseudoreference.fa",
               "sample": "/jobs/malva/20200415-074226_3b01e54f-63b6-4f84-9003-30c480777dcb/sample.fq",
               "vcf": "/jobs/vcf/20200415-073411_9fa3556d-80d4-4742-87c4-7a0bd0f484e4/vcf/run.cleaned.vcf",
               "workdir": "/jobs/malva/20200415-074226_3b01e54f-63b6-4f84-9003-30c480777dcb"
            },
            "input": {
               "kmc": "/jobs/malva/20200415-074226_3b01e54f-63b6-4f84-9003-30c480777dcb/KMC/kmers.kmc_pre",
               "ref": "/jobs/vcf/20200415-073411_9fa3556d-80d4-4742-87c4-7a0bd0f484e4/snpsites/run.pseudoreference.fa",
               "vcf": "/jobs/vcf/20200415-073411_9fa3556d-80d4-4742-87c4-7a0bd0f484e4/vcf/run.cleaned.vcf"
            },
            "output": {
               "vcf": "/jobs/malva/20200415-074226_3b01e54f-63b6-4f84-9003-30c480777dcb/malva/malva.vcf"
            },
            "params": {
               "c": 300,
               "k": 35,
               "kmc_prefix": "/jobs/malva/20200415-074226_3b01e54f-63b6-4f84-9003-30c480777dcb/KMC/kmers",
               "r": 35
            },
            "result": "Success",
            "return_code": 0,
            "time": "2020-04-15 07:42:30"
         }
      }
   },
   "params": {
      "cores": "4",
      "lenkmers": "35",
      "maxmem": "4",
      "maxocc": "300",
      "minocc": "100",
      "vcf": "20200415-073411_9fa3556d-80d4-4742-87c4-7a0bd0f484e4"
   },
   "snakemake": "==> /jobs/malva/20200415-074226_3b01e54f-63b6-4f84-9003-30c480777dcb/.snakemake/log/2020-04-15T074226.557704.snakemake.log <==\n\n[Wed Apr 15 07:42:30 2020]\nlocalrule run:\n    input: /jobs/malva/20200415-074226_3b01e54f-63b6-4f84-9003-30c480777dcb/malva/malva.vcf\n    jobid: 0\n\n[Wed Apr 15 07:42:30 2020]\nFinished job 0.\n3 of 3 steps (100%) done\nComplete log: /jobs/malva/20200415-074226_3b01e54f-63b6-4f84-9003-30c480777dcb/.snakemake/log/2020-04-15T074226.557704.snakemake.log\n"
}
```

```json
{
   "alias": "job-malva-upload",
   "description": "this will fail",
   "filename": "/jobs/malva/20200415-074343_7bfa34ef-67bd-4183-a267-d99dd02b4e95/sample.fq",
   "id": "20200415-074343_7bfa34ef-67bd-4183-a267-d99dd02b4e95",
   "input": {
      "reference": "/jobs/vcf/20200415-073451_dca8c691-4b79-405b-96a6-755d8adeebc3/test.fasta",
      "vcf": "/jobs/vcf/20200415-073451_dca8c691-4b79-405b-96a6-755d8adeebc3/test.vcf"
   },
   "log": {
      "last_time": "2020-04-15 07:43:49",
      "status": "Failed",
      "steps": {
         "KMC": {
            "command": "kmc -t4 -m4 -k35 -ci100 -cs300 -fm /jobs/malva/20200415-074343_7bfa34ef-67bd-4183-a267-d99dd02b4e95/sample.fq /jobs/malva/20200415-074343_7bfa34ef-67bd-4183-a267-d99dd02b4e95/KMC/kmers /jobs/malva/20200415-074343_7bfa34ef-67bd-4183-a267-d99dd02b4e95/KMC/tmp &> /jobs/malva/20200415-074343_7bfa34ef-67bd-4183-a267-d99dd02b4e95/KMC/kmc.log",
            "config": {
               "lenkmers": 35,
               "maxmem": 4,
               "maxocc": 300,
               "minocc": 100,
               "reference": "/jobs/vcf/20200415-073451_dca8c691-4b79-405b-96a6-755d8adeebc3/test.fasta",
               "sample": "/jobs/malva/20200415-074343_7bfa34ef-67bd-4183-a267-d99dd02b4e95/sample.fq",
               "vcf": "/jobs/vcf/20200415-073451_dca8c691-4b79-405b-96a6-755d8adeebc3/test.vcf",
               "workdir": "/jobs/malva/20200415-074343_7bfa34ef-67bd-4183-a267-d99dd02b4e95"
            },
            "input": {
               "sample": "/jobs/malva/20200415-074343_7bfa34ef-67bd-4183-a267-d99dd02b4e95/sample.fq"
            },
            "output": {
               "kmc_out": "/jobs/malva/20200415-074343_7bfa34ef-67bd-4183-a267-d99dd02b4e95/KMC/kmers.kmc_pre"
            },
            "params": {
               "kmc_prefix": "/jobs/malva/20200415-074343_7bfa34ef-67bd-4183-a267-d99dd02b4e95/KMC/kmers",
               "kmc_tmp": "/jobs/malva/20200415-074343_7bfa34ef-67bd-4183-a267-d99dd02b4e95/KMC/tmp",
               "lenkmers": 35,
               "maxmem": 4,
               "maxocc": 300,
               "minocc": 100
            },
            "result": "Success",
            "return_code": 0,
            "time": "2020-04-15 07:43:45"
         },
         "malva": {
            "command": "malva-geno -1 -k 35 -r 35 -c 300 -b 1 /jobs/vcf/20200415-073451_dca8c691-4b79-405b-96a6-755d8adeebc3/test.fasta /jobs/vcf/20200415-073451_dca8c691-4b79-405b-96a6-755d8adeebc3/test.vcf /jobs/malva/20200415-074343_7bfa34ef-67bd-4183-a267-d99dd02b4e95/KMC/kmers > /jobs/malva/20200415-074343_7bfa34ef-67bd-4183-a267-d99dd02b4e95/malva/malva.vcf 2> /jobs/malva/20200415-074343_7bfa34ef-67bd-4183-a267-d99dd02b4e95/malva/malva.log",
            "config": {
               "lenkmers": 35,
               "maxmem": 4,
               "maxocc": 300,
               "minocc": 100,
               "reference": "/jobs/vcf/20200415-073451_dca8c691-4b79-405b-96a6-755d8adeebc3/test.fasta",
               "sample": "/jobs/malva/20200415-074343_7bfa34ef-67bd-4183-a267-d99dd02b4e95/sample.fq",
               "vcf": "/jobs/vcf/20200415-073451_dca8c691-4b79-405b-96a6-755d8adeebc3/test.vcf",
               "workdir": "/jobs/malva/20200415-074343_7bfa34ef-67bd-4183-a267-d99dd02b4e95"
            },
            "input": {
               "kmc": "/jobs/malva/20200415-074343_7bfa34ef-67bd-4183-a267-d99dd02b4e95/KMC/kmers.kmc_pre",
               "ref": "/jobs/vcf/20200415-073451_dca8c691-4b79-405b-96a6-755d8adeebc3/test.fasta",
               "vcf": "/jobs/vcf/20200415-073451_dca8c691-4b79-405b-96a6-755d8adeebc3/test.vcf"
            },
            "output": {
               "vcf": "/jobs/malva/20200415-074343_7bfa34ef-67bd-4183-a267-d99dd02b4e95/malva/malva.vcf"
            },
            "params": {
               "c": 300,
               "k": 35,
               "kmc_prefix": "/jobs/malva/20200415-074343_7bfa34ef-67bd-4183-a267-d99dd02b4e95/KMC/kmers",
               "r": 35
            },
            "result": "Failed",
            "return_code": 134,
            "time": "2020-04-15 07:43:49"
         }
      }
   },
   "params": {
      "cores": "4",
      "lenkmers": "35",
      "maxmem": "4",
      "maxocc": "300",
      "minocc": "100",
      "vcf": "20200415-073451_dca8c691-4b79-405b-96a6-755d8adeebc3"
   },
   "snakemake": "==> /jobs/malva/20200415-074343_7bfa34ef-67bd-4183-a267-d99dd02b4e95/.snakemake/log/2020-04-15T074343.722124.snakemake.log <==\n[Wed Apr 15 07:43:45 2020]\nrule malva:\n    input: /jobs/vcf/20200415-073451_dca8c691-4b79-405b-96a6-755d8adeebc3/test.fasta, /jobs/vcf/20200415-073451_dca8c691-4b79-405b-96a6-755d8adeebc3/test.vcf, /jobs/malva/20200415-074343_7bfa34ef-67bd-4183-a267-d99dd02b4e95/KMC/kmers.kmc_pre\n    output: /jobs/malva/20200415-074343_7bfa34ef-67bd-4183-a267-d99dd02b4e95/malva/malva.vcf\n    log: /jobs/malva/20200415-074343_7bfa34ef-67bd-4183-a267-d99dd02b4e95/malva/malva.log, /jobs/malva/20200415-074343_7bfa34ef-67bd-4183-a267-d99dd02b4e95/malva/malva.json\n    jobid: 1\n\nShutting down, this might take some time.\nExiting because a job execution failed. Look above for error message\nComplete log: /jobs/malva/20200415-074343_7bfa34ef-67bd-4183-a267-d99dd02b4e95/.snakemake/log/2020-04-15T074343.722124.snakemake.log\n"
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
-F 'vcf=20200416-151902_44647d6f-8112-4462-844e-3d6ad9c200d9' \
-F 'minocc=100' \
-F 'maxocc=300' \
-F 'lenkmers=35' \
-F 'maxmem=4' \
-F 'cores=4' \
-F 'alias=job-malva' \
http://localhost:56733/api/malva


curl -i \
-F 'sample=@snakemake/example/sample.fq' \
-F 'vcf=20200416-152305_e3e11ac4-a66b-46e6-b49e-fecbe9abbfcb' \
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
   "alias": "job-malva",
   "description": "None",
   "filename": "/jobs/malva/20200415-074226_3b01e54f-63b6-4f84-9003-30c480777dcb/sample.fq",
   "id": "20200415-074226_3b01e54f-63b6-4f84-9003-30c480777dcb",
   "input": {
      "reference": "/jobs/vcf/20200415-073411_9fa3556d-80d4-4742-87c4-7a0bd0f484e4/snpsites/run.pseudoreference.fa",
      "vcf": "/jobs/vcf/20200415-073411_9fa3556d-80d4-4742-87c4-7a0bd0f484e4/vcf/run.cleaned.vcf"
   },
   "params": {
      "cores": "4",
      "lenkmers": "35",
      "maxmem": "4",
      "maxocc": "300",
      "minocc": "100",
      "vcf": "20200415-073411_9fa3556d-80d4-4742-87c4-7a0bd0f484e4"
   },
   "status": "Running"
}
```

```json
{
   "alias": "job-malva-upload",
   "description": "this will fail",
   "filename": "/jobs/malva/20200415-074343_7bfa34ef-67bd-4183-a267-d99dd02b4e95/sample.fq",
   "id": "20200415-074343_7bfa34ef-67bd-4183-a267-d99dd02b4e95",
   "input": {
      "reference": "/jobs/vcf/20200415-073451_dca8c691-4b79-405b-96a6-755d8adeebc3/test.fasta",
      "vcf": "/jobs/vcf/20200415-073451_dca8c691-4b79-405b-96a6-755d8adeebc3/test.vcf"
   },
   "params": {
      "cores": "4",
      "lenkmers": "35",
      "maxmem": "4",
      "maxocc": "300",
      "minocc": "100",
      "vcf": "20200415-073451_dca8c691-4b79-405b-96a6-755d8adeebc3"
   },
   "status": "Running"
}
```

## DELETE /malva/
Delte the specified list MALVA jobs
Note this will ignore non-existant IDs.

### Request example
```bash
curl -i --header "Content-Type: application/json" \
-X DELETE \
--data '{"id": ["20200416-075159_58bef383-5e88-4b5c-b042-5a20494c9149","20200416-075202_f5f48001-5d76-4daa-a9f0-74039272bedf"]}' \
http://localhost:56733/api/malva
```
### Return example
```json
{
   "Content": "Deleted successfully."
}
```

## DELETE /malva/:id
Delete the specified MALVA job

### Request example
```bash
curl -i -X DELETE http://localhost:56733/api/malva/20200415-151728_c31df80e-1461-489a-b4c4-f7031748a265

curl -i -X DELETE http://localhost:56733/api/malva/noexists
```
### Return example
Good:
```json
{
   "Content": "Deleted successfully."
}
```

Bad:
```json
{
   "message": "ID not found"
}
```