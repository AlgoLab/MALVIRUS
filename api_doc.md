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
         "id":"202004-1010-0435_6fe0017f-2d0e-4023-b4c2-1fcfc0470b2f",
         "status":"Completed"
      },
      {
         "descritption":"description-vcf",
         "filename":"test.vcf",
         "id":"202004-1010-0328_d44ca6b0-8b31-4aee-a6e4-8a92903be135",
         "status":"Uploaded"
      },
      {
         "descritption":"description-fasta",
         "filename":"references.fa",
         "id":"202004-1010-0324_612c7336-f988-495c-b06c-c867ccc02b8c",
         "status":"Running"
      }
   ]
}
```

# GET /vcf/:id
Get the details of the specified VCF

### Request example
```bash
curl -i http://localhost:56733/api/vcf/202004-1010-0435_6fe0017f-2d0e-4023-b4c2-1fcfc0470b2f
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
   "id":"202004-1010-0435_6fe0017f-2d0e-4023-b4c2-1fcfc0470b2f",
   "log":{
      "last_time":"2020-04-10 10:04:37",
      "status":"Completed",
      "steps":{
         "mafft":{
            "command":"mafft --auto --thread 5 /jobs/vcf/202004-1010-0435_6fe0017f-2d0e-4023-b4c2-1fcfc0470b2f/references.fa > /jobs/vcf/202004-1010-0435_6fe0017f-2d0e-4023-b4c2-1fcfc0470b2f/mafft/multi_alignment.msa 2> /jobs/vcf/202004-1010-0435_6fe0017f-2d0e-4023-b4c2-1fcfc0470b2f/mafft/mafft.log",
            "config":{
               "multifa":"/jobs/vcf/202004-1010-0435_6fe0017f-2d0e-4023-b4c2-1fcfc0470b2f/references.fa",
               "workdir":"/jobs/vcf/202004-1010-0435_6fe0017f-2d0e-4023-b4c2-1fcfc0470b2f"
            },
            "input":{
               "fa":"/jobs/vcf/202004-1010-0435_6fe0017f-2d0e-4023-b4c2-1fcfc0470b2f/references.fa"
            },
            "output":{
               "msa":"/jobs/vcf/202004-1010-0435_6fe0017f-2d0e-4023-b4c2-1fcfc0470b2f/mafft/multi_alignment.msa"
            },
            "params":{

            },
            "result":"Success",
            "return_code":0,
            "time":"2020-04-10 10:04:36"
         },
         "snpsites":{
            "command":"snp-sites -rmcv -o /jobs/vcf/202004-1010-0435_6fe0017f-2d0e-4023-b4c2-1fcfc0470b2f/snpsites/run /jobs/vcf/202004-1010-0435_6fe0017f-2d0e-4023-b4c2-1fcfc0470b2f/mafft/multi_alignment.msa &> /jobs/vcf/202004-1010-0435_6fe0017f-2d0e-4023-b4c2-1fcfc0470b2f/snpsites/snpsites.log",
            "config":{
               "multifa":"/jobs/vcf/202004-1010-0435_6fe0017f-2d0e-4023-b4c2-1fcfc0470b2f/references.fa",
               "workdir":"/jobs/vcf/202004-1010-0435_6fe0017f-2d0e-4023-b4c2-1fcfc0470b2f"
            },
            "input":{
               "msa":"/jobs/vcf/202004-1010-0435_6fe0017f-2d0e-4023-b4c2-1fcfc0470b2f/mafft/multi_alignment.msa"
            },
            "output":{
               "ref":"/jobs/vcf/202004-1010-0435_6fe0017f-2d0e-4023-b4c2-1fcfc0470b2f/snpsites/run.pseudoreference.fa",
               "snps":"/jobs/vcf/202004-1010-0435_6fe0017f-2d0e-4023-b4c2-1fcfc0470b2f/snpsites/run.vcf"
            },
            "params":{
               "prefix":"/jobs/vcf/202004-1010-0435_6fe0017f-2d0e-4023-b4c2-1fcfc0470b2f/snpsites/run"
            },
            "result":"Success",
            "return_code":0,
            "time":"2020-04-10 10:04:36"
         },
         "vcf_add_freqs":{
            "command":"format_vcf.py freq /jobs/vcf/202004-1010-0435_6fe0017f-2d0e-4023-b4c2-1fcfc0470b2f/vcf/run.1.vcf > /jobs/vcf/202004-1010-0435_6fe0017f-2d0e-4023-b4c2-1fcfc0470b2f/vcf/run.cleaned.vcf 2> /jobs/vcf/202004-1010-0435_6fe0017f-2d0e-4023-b4c2-1fcfc0470b2f/vcf/vcf_clean.2.log",
            "config":{
               "multifa":"/jobs/vcf/202004-1010-0435_6fe0017f-2d0e-4023-b4c2-1fcfc0470b2f/references.fa",
               "workdir":"/jobs/vcf/202004-1010-0435_6fe0017f-2d0e-4023-b4c2-1fcfc0470b2f"
            },
            "input":{
               "clean_vcf":"/jobs/vcf/202004-1010-0435_6fe0017f-2d0e-4023-b4c2-1fcfc0470b2f/vcf/run.1.vcf"
            },
            "output":{
               "freq_vcf":"/jobs/vcf/202004-1010-0435_6fe0017f-2d0e-4023-b4c2-1fcfc0470b2f/vcf/run.cleaned.vcf"
            },
            "params":{

            },
            "result":"Success",
            "return_code":0,
            "time":"2020-04-10 10:04:37"
         },
         "vcf_clean_header":{
            "command":"format_vcf.py clean /jobs/vcf/202004-1010-0435_6fe0017f-2d0e-4023-b4c2-1fcfc0470b2f/snpsites/run.vcf > /jobs/vcf/202004-1010-0435_6fe0017f-2d0e-4023-b4c2-1fcfc0470b2f/vcf/run.1.vcf 2> /jobs/vcf/202004-1010-0435_6fe0017f-2d0e-4023-b4c2-1fcfc0470b2f/vcf/vcf_clean.1.log",
            "config":{
               "multifa":"/jobs/vcf/202004-1010-0435_6fe0017f-2d0e-4023-b4c2-1fcfc0470b2f/references.fa",
               "workdir":"/jobs/vcf/202004-1010-0435_6fe0017f-2d0e-4023-b4c2-1fcfc0470b2f"
            },
            "input":{
               "base_vcf":"/jobs/vcf/202004-1010-0435_6fe0017f-2d0e-4023-b4c2-1fcfc0470b2f/snpsites/run.vcf"
            },
            "output":{
               "clean_vcf":"/jobs/vcf/202004-1010-0435_6fe0017f-2d0e-4023-b4c2-1fcfc0470b2f/vcf/run.1.vcf"
            },
            "params":{

            },
            "result":"Success",
            "return_code":0,
            "time":"2020-04-10 10:04:36"
         }
      }
   }
}
```

# POST /vcf
Upload a new precompiled VCF or a FASTA of references to compute a VCF from.

### Request documentation
The form should submit the `file`, a value `filetype=vcf/fasta` and a `description`. A missing or illegal filetype will result in a 400.
For a `typefile=fasta`, also a value cores must be submitted.

### Request example
```bash
curl -i -F 'filetype=fasta' -F 'description=description-fasta' -F "file=@snakemake/example/references.fa" -F "cores=5" http://localhost:56733/api/vcf


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
   "id":"202004-1010-0324_612c7336-f988-495c-b06c-c867ccc02b8c",
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
```
HTTP/1.0 200 OK
Content-Type: application/json
Content-Length: 38
Server: Werkzeug/1.0.1 Python/3.6.9
Date: Wed, 08 Apr 2020 10:20:29 GMT

{
   "content":[
      {
         "filename":"sample.fq",
         "id":"202004-1010-1249_1d913074-f298-4aa1-9780-c5bb933413d9",
         "params":{
            "cores":"4",
            "lenkmers":"35",
            "maxmem":"4",
            "maxocc":"300",
            "minocc":"100",
            "vcf":"202004-1010-0435_6fe0017f-2d0e-4023-b4c2-1fcfc0470b2f"
         },
         "status":"Failed"
      },
      {
         "filename":"sample.fq",
         "id":"202004-1010-1746_2f5ed8db-7029-4a7b-a0f6-60584020e8a4",
         "params":{
            "cores":"4",
            "lenkmers":"35",
            "maxmem":"4",
            "maxocc":"300",
            "minocc":"100",
            "vcf":"202004-1010-0435_6fe0017f-2d0e-4023-b4c2-1fcfc0470b2f"
         },
         "status":"Completed"
      },
      {
         "filename":"sample.fq",
         "id":"202004-1010-2150_24d85dd7-b913-4549-aa11-63c8859c44b1",
         "params":{
            "cores":"4",
            "lenkmers":"35",
            "maxmem":"4",
            "maxocc":"300",
            "minocc":"100",
            "vcf":"202004-1010-0435_6fe0017f-2d0e-4023-b4c2-1fcfc0470b2f"
         },
         "status":"Running"
      }
   ]
}
```

# GET /malva/:id
Get the details of the specified job

### Request example
```bash
curl -i http://localhost:56733/api/malva/202004-1010-1746_2f5ed8db-7029-4a7b-a0f6-60584020e8a4
```
### Return example
```
HTTP/1.0 200 OK
Content-Type: application/json
Content-Length: 50
Server: Werkzeug/1.0.1 Python/3.6.9
Date: Wed, 08 Apr 2020 10:20:52 GMT

{
   "filename":"sample.fq",
   "id":"202004-1010-1746_2f5ed8db-7029-4a7b-a0f6-60584020e8a4",
   "log":{
      "last_time":"2020-04-10 10:17:51",
      "status":"Completed",
      "steps":{
         "KMC":{
            "command":"kmc -t4 -m4 -k43 -ci5 -cs750 -fm /jobs/malva/202004-1010-1746_2f5ed8db-7029-4a7b-a0f6-60584020e8a4/sample.fq /jobs/malva/202004-1010-1746_2f5ed8db-7029-4a7b-a0f6-60584020e8a4/KMC/kmers /jobs/malva/202004-1010-1746_2f5ed8db-7029-4a7b-a0f6-60584020e8a4/KMC/tmp &> /jobs/malva/202004-1010-1746_2f5ed8db-7029-4a7b-a0f6-60584020e8a4/KMC/kmc.log",
            "config":{
               "lenkmers":35,
               "maxmem":4,
               "maxocc":300,
               "minocc":100,
               "reference":"/jobs/vcf/202004-1010-0435_6fe0017f-2d0e-4023-b4c2-1fcfc0470b2f/snpsites/run.pseudoreference.fa",
               "sample":"/jobs/malva/202004-1010-1746_2f5ed8db-7029-4a7b-a0f6-60584020e8a4/sample.fq",
               "vcf":"/jobs/vcf/202004-1010-0435_6fe0017f-2d0e-4023-b4c2-1fcfc0470b2f/vcf/run.cleaned.vcf",
               "workdir":"/jobs/malva/202004-1010-1746_2f5ed8db-7029-4a7b-a0f6-60584020e8a4"
            },
            "input":{
               "sample":"/jobs/malva/202004-1010-1746_2f5ed8db-7029-4a7b-a0f6-60584020e8a4/sample.fq"
            },
            "output":{
               "kmc_out":"/jobs/malva/202004-1010-1746_2f5ed8db-7029-4a7b-a0f6-60584020e8a4/KMC/kmers.kmc_pre"
            },
            "params":{
               "kmc_prefix":"/jobs/malva/202004-1010-1746_2f5ed8db-7029-4a7b-a0f6-60584020e8a4/KMC/kmers",
               "kmc_tmp":"/jobs/malva/202004-1010-1746_2f5ed8db-7029-4a7b-a0f6-60584020e8a4/KMC/tmp"
            },
            "result":"Success",
            "return_code":0,
            "time":"2020-04-10 10:17:49"
         },
         "malva":{
            "command":"malva-geno -1 -k 35 -r 43 -c 750 -b 1 /jobs/vcf/202004-1010-0435_6fe0017f-2d0e-4023-b4c2-1fcfc0470b2f/snpsites/run.pseudoreference.fa /jobs/vcf/202004-1010-0435_6fe0017f-2d0e-4023-b4c2-1fcfc0470b2f/vcf/run.cleaned.vcf /jobs/malva/202004-1010-1746_2f5ed8db-7029-4a7b-a0f6-60584020e8a4/KMC/kmers > /jobs/malva/202004-1010-1746_2f5ed8db-7029-4a7b-a0f6-60584020e8a4/malva/malva.vcf 2> /jobs/malva/202004-1010-1746_2f5ed8db-7029-4a7b-a0f6-60584020e8a4/malva/malva.log",
            "config":{
               "lenkmers":35,
               "maxmem":4,
               "maxocc":300,
               "minocc":100,
               "reference":"/jobs/vcf/202004-1010-0435_6fe0017f-2d0e-4023-b4c2-1fcfc0470b2f/snpsites/run.pseudoreference.fa",
               "sample":"/jobs/malva/202004-1010-1746_2f5ed8db-7029-4a7b-a0f6-60584020e8a4/sample.fq",
               "vcf":"/jobs/vcf/202004-1010-0435_6fe0017f-2d0e-4023-b4c2-1fcfc0470b2f/vcf/run.cleaned.vcf",
               "workdir":"/jobs/malva/202004-1010-1746_2f5ed8db-7029-4a7b-a0f6-60584020e8a4"
            },
            "input":{
               "kmc":"/jobs/malva/202004-1010-1746_2f5ed8db-7029-4a7b-a0f6-60584020e8a4/KMC/kmers.kmc_pre",
               "ref":"/jobs/vcf/202004-1010-0435_6fe0017f-2d0e-4023-b4c2-1fcfc0470b2f/snpsites/run.pseudoreference.fa",
               "vcf":"/jobs/vcf/202004-1010-0435_6fe0017f-2d0e-4023-b4c2-1fcfc0470b2f/vcf/run.cleaned.vcf"
            },
            "output":{
               "vcf":"/jobs/malva/202004-1010-1746_2f5ed8db-7029-4a7b-a0f6-60584020e8a4/malva/malva.vcf"
            },
            "params":{
               "kmc_prefix":"/jobs/malva/202004-1010-1746_2f5ed8db-7029-4a7b-a0f6-60584020e8a4/KMC/kmers"
            },
            "result":"Success",
            "return_code":0,
            "time":"2020-04-10 10:17:51"
         }
      }
   },
   "params":{
      "cores":"4",
      "lenkmers":"35",
      "maxmem":"4",
      "maxocc":"300",
      "minocc":"100",
      "vcf":"202004-1010-0435_6fe0017f-2d0e-4023-b4c2-1fcfc0470b2f"
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

### Request example
```bash
curl -i \
-F 'sample=@snakemake/example/sample.fq' \
-F 'vcf=202004-1010-0435_6fe0017f-2d0e-4023-b4c2-1fcfc0470b2f' \
-F 'minocc=100' \
-F 'maxocc=300' \
-F 'lenkmers=35' \
-F 'maxmem=4' \
-F 'cores=4' \
http://localhost:56733/api/malva
```
### Return example
Good:
```
HTTP/1.1 200 OK
Server: nginx/1.15.8
Date: Fri, 10 Apr 2020 10:21:51 GMT
Content-Type: application/json
Content-Length: 249
Connection: keep-alive

{
   "filename":"sample.fq",
   "id":"202004-1010-2150_24d85dd7-b913-4549-aa11-63c8859c44b1",
   "params":{
      "cores":"4",
      "lenkmers":"35",
      "maxmem":"4",
      "maxocc":"300",
      "minocc":"100",
      "vcf":"202004-1010-0435_6fe0017f-2d0e-4023-b4c2-1fcfc0470b2f"
   },
   "status":"Running"
}
```