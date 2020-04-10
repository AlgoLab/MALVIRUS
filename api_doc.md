# Endpoint /vcf

## GET /vcf 
Get the full list of VCFs available for MALVIRUS

### Request example
```bash
curl -i http://localhost:56733/api/vcf
```
### Return example
```
HTTP/1.0 200 OK
Content-Type: application/json
Content-Length: 32
Server: Werkzeug/1.0.1 Python/3.6.9
Date: Wed, 08 Apr 2020 10:19:52 GMT

{
   "content":[
      {
         "descritption":"description-fasta",
         "filename":"references.fa",
         "id":"7d4c97cc-75bd-48f6-9819-be7403cf72a0",
         "status":"Completed"
      },
      {
         "descritption":"description-vcf",
         "filename":"test.vcf",
         "id":"70133574-18ae-47de-8f47-895a3a2ae5f6",
         "status":"Uploaded"
      },
      {
         "descritption":"description-fasta",
         "filename":"references.fa",
         "id":"c0b6ffde-f674-43a7-ac72-f822931b2ffb",
         "status":"Running"
      }
   ]
}
```

# GET /vcf/:id
Get the details of the specified VCF

### Request example
```bash
curl -i http://localhost:56733/api/vcf/7d4c97cc-75bd-48f6-9819-be7403cf72a0
```
### Return example
```
HTTP/1.0 200 OK
Content-Type: application/json
Content-Length: 56
Server: Werkzeug/1.0.1 Python/3.6.9
Date: Wed, 08 Apr 2020 08:53:42 GMT

{
   "descritption":"description-fasta",
   "filename":"references.fa",
   "id":"7d4c97cc-75bd-48f6-9819-be7403cf72a0",
   "log":{
      "last_time":"2020-04-10 08:08:13",
      "status":"Completed",
      "steps":{
         "mafft":{
            "command":"mafft --auto --thread 5 /jobs/vcf/7d4c97cc-75bd-48f6-9819-be7403cf72a0/references.fa > /jobs/vcf/7d4c97cc-75bd-48f6-9819-be7403cf72a0/mafft/multi_alignment.msa 2> /jobs/vcf/7d4c97cc-75bd-48f6-9819-be7403cf72a0/mafft/mafft.log",
            "config":{
               "multifa":"/jobs/vcf/7d4c97cc-75bd-48f6-9819-be7403cf72a0/references.fa",
               "workdir":"/jobs/vcf/7d4c97cc-75bd-48f6-9819-be7403cf72a0"
            },
            "input":{
               "fa":"/jobs/vcf/7d4c97cc-75bd-48f6-9819-be7403cf72a0/references.fa"
            },
            "output":{
               "msa":"/jobs/vcf/7d4c97cc-75bd-48f6-9819-be7403cf72a0/mafft/multi_alignment.msa"
            },
            "params":{

            },
            "result":"Success",
            "return_code":0,
            "time":"2020-04-10 08:08:12"
         },
         "snpsites":{
            "command":"snp-sites -rmcv -o /jobs/vcf/7d4c97cc-75bd-48f6-9819-be7403cf72a0/snpsites/run /jobs/vcf/7d4c97cc-75bd-48f6-9819-be7403cf72a0/mafft/multi_alignment.msa &> /jobs/vcf/7d4c97cc-75bd-48f6-9819-be7403cf72a0/snpsites/snpsites.log",
            "config":{
               "multifa":"/jobs/vcf/7d4c97cc-75bd-48f6-9819-be7403cf72a0/references.fa",
               "workdir":"/jobs/vcf/7d4c97cc-75bd-48f6-9819-be7403cf72a0"
            },
            "input":{
               "msa":"/jobs/vcf/7d4c97cc-75bd-48f6-9819-be7403cf72a0/mafft/multi_alignment.msa"
            },
            "output":{
               "ref":"/jobs/vcf/7d4c97cc-75bd-48f6-9819-be7403cf72a0/snpsites/run.pseudoreference.fa",
               "snps":"/jobs/vcf/7d4c97cc-75bd-48f6-9819-be7403cf72a0/snpsites/run.vcf"
            },
            "params":{
               "prefix":"/jobs/vcf/7d4c97cc-75bd-48f6-9819-be7403cf72a0/snpsites/run"
            },
            "result":"Success",
            "return_code":0,
            "time":"2020-04-10 08:08:12"
         },
         "vcf_add_freqs":{
            "command":"format_vcf.py freq /jobs/vcf/7d4c97cc-75bd-48f6-9819-be7403cf72a0/vcf/run.1.vcf > /jobs/vcf/7d4c97cc-75bd-48f6-9819-be7403cf72a0/vcf/run.cleaned.vcf 2> /jobs/vcf/7d4c97cc-75bd-48f6-9819-be7403cf72a0/vcf/vcf_clean.2.log",
            "config":{
               "multifa":"/jobs/vcf/7d4c97cc-75bd-48f6-9819-be7403cf72a0/references.fa",
               "workdir":"/jobs/vcf/7d4c97cc-75bd-48f6-9819-be7403cf72a0"
            },
            "input":{
               "clean_vcf":"/jobs/vcf/7d4c97cc-75bd-48f6-9819-be7403cf72a0/vcf/run.1.vcf"
            },
            "output":{
               "freq_vcf":"/jobs/vcf/7d4c97cc-75bd-48f6-9819-be7403cf72a0/vcf/run.cleaned.vcf"
            },
            "params":{

            },
            "result":"Success",
            "return_code":0,
            "time":"2020-04-10 08:08:13"
         },
         "vcf_clean_header":{
            "command":"format_vcf.py clean /jobs/vcf/7d4c97cc-75bd-48f6-9819-be7403cf72a0/snpsites/run.vcf > /jobs/vcf/7d4c97cc-75bd-48f6-9819-be7403cf72a0/vcf/run.1.vcf 2> /jobs/vcf/7d4c97cc-75bd-48f6-9819-be7403cf72a0/vcf/vcf_clean.1.log",
            "config":{
               "multifa":"/jobs/vcf/7d4c97cc-75bd-48f6-9819-be7403cf72a0/references.fa",
               "workdir":"/jobs/vcf/7d4c97cc-75bd-48f6-9819-be7403cf72a0"
            },
            "input":{
               "base_vcf":"/jobs/vcf/7d4c97cc-75bd-48f6-9819-be7403cf72a0/snpsites/run.vcf"
            },
            "output":{
               "clean_vcf":"/jobs/vcf/7d4c97cc-75bd-48f6-9819-be7403cf72a0/vcf/run.1.vcf"
            },
            "params":{

            },
            "result":"Success",
            "return_code":0,
            "time":"2020-04-10 08:08:12"
         }
      }
   }
}
```

# POST /vcf
Upload a new precompiled VCF or a FASTA of references to compute a VCF from.

### Request documentation
The form should submit the `file`, a value `filetype=vcf/fasta` and a `description`. A missing or illegal filetype will result in a 400.

### Request example
```bash
curl -i -F 'filetype=fasta' -F 'description=description-fasta' -F "file=@snakemake/example/references.fa" http://localhost:56733/api/vcf


curl -i -F 'filetype=vcf' -F 'description=description-vcf' -F "file=@test.vcf" http://localhost:56733/api/vcf
```
### Return example
Good:
```
HTTP/1.1 200 OK
Server: nginx/1.15.8
Date: Fri, 10 Apr 2020 08:12:27 GMT
Content-Type: application/json
Content-Length: 127
Connection: keep-alive

{
  "descritption":"description-fasta",
  "filename":"references.fa",
  "id":"53a7923c-224a-4ee0-b8b6-55ea86550c01",
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
Get the full list of jobs executed / in progress?

### Request example
```bash
curl -i http://localhost:56733/api/malva
```
### Return example
```
HTTP/1.0 200 OK
Content-Type: application/json
Content-Length: 38
Server: Werkzeug/1.0.1 Python/3.6.9
Date: Wed, 08 Apr 2020 10:20:29 GMT

{
  "content": "list of malva jobs"
}
```

# GET /malva/:id
Get the details of the specified job

### Request example
```bash
curl -i http://localhost:56733/api/malva/312das
```
### Return example
```
HTTP/1.0 200 OK
Content-Type: application/json
Content-Length: 50
Server: Werkzeug/1.0.1 Python/3.6.9
Date: Wed, 08 Apr 2020 10:20:52 GMT

{
  "content": "job details", 
  "id": "312das"
}
```

# POST /malva
Upload a new precompiled VCF or a FASTA of references to compute a VCF from.

### Request documentation
The form should submit the arguments needed for configuration:

- `multifa`: ???
- `sample`: FASTQ sample to run MALVIRUS on
- `minocc`: Minimum occurrence of kmers / alleles
- `maxocc`: Maximum occurrence of kmers / alleles
- `lenkmers`: Dimension of k-mer
- `maxmem`: Max memory for KMC (GB)
- `threads`: Number of threads to use

### Request example
```bash
curl -i \
-F 'multifa=msa' \
-F 'sample=fq' \
-F 'minocc=100' \
-F 'maxocc=300' \
-F 'lenkmers=35' \
-F 'maxmem=4' \
-F 'threads=4' \
http://localhost:56733/api/malva
```
### Return example
Good:
```
HTTP/1.0 200 OK
Content-Type: text/html; charset=utf-8
Content-Length: 3
Server: Werkzeug/1.0.1 Python/3.6.9
Date: Wed, 08 Apr 2020 10:09:21 GMT

vcf
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