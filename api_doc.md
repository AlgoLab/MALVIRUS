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
         "alias":"Fasta",
         "description":"description-fasta",
         "filename":"references.fa",
         "id":"2020-04-14-08-58-54_f3356a7f-140d-4520-8653-7ef9bfd12e27",
         "status":"Uploaded"
      },
      {
         "alias":"2020-04-14-09-00-18_e48f5edc-ec45-4095-a008-ead98e8546e0",
         "description":"description-fasta",
         "filename":"references.fa",
         "id":"2020-04-14-09-00-18_e48f5edc-ec45-4095-a008-ead98e8546e0",
         "status":"Completed"
      }
   ]
}
```

# GET /vcf/:id
Get the details of the specified VCF

### Request example
```bash
curl -i http://localhost:56733/api/vcf/2020-04-14-08-58-54_f3356a7f-140d-4520-8653-7ef9bfd12e27
```
### Return example
```
HTTP/1.0 200 OK
Content-Type: application/json
Content-Length: 56
Server: Werkzeug/1.0.1 Python/3.6.9
Date: Wed, 08 Apr 2020 08:53:42 GMT

{
   "alias":"Fasta",
   "description":"description-fasta",
   "filename":"references.fa",
   "id":"2020-04-14-08-58-54_f3356a7f-140d-4520-8653-7ef9bfd12e27",
   "log":{
      "last_time":"2020-04-14 08:58:57",
      "status":"Completed",
      "steps":{
         "mafft":{
            "command":"mafft --auto --thread 5 /jobs/vcf/2020-04-14-08-58-54_f3356a7f-140d-4520-8653-7ef9bfd12e27/references.fa > /jobs/vcf/2020-04-14-08-58-54_f3356a7f-140d-4520-8653-7ef9bfd12e27/mafft/multi_alignment.msa 2> /jobs/vcf/2020-04-14-08-58-54_f3356a7f-140d-4520-8653-7ef9bfd12e27/mafft/mafft.log",
            "config":{
               "multifa":"/jobs/vcf/2020-04-14-08-58-54_f3356a7f-140d-4520-8653-7ef9bfd12e27/references.fa",
               "workdir":"/jobs/vcf/2020-04-14-08-58-54_f3356a7f-140d-4520-8653-7ef9bfd12e27"
            },
            "input":{
               "fa":"/jobs/vcf/2020-04-14-08-58-54_f3356a7f-140d-4520-8653-7ef9bfd12e27/references.fa"
            },
            "output":{
               "msa":"/jobs/vcf/2020-04-14-08-58-54_f3356a7f-140d-4520-8653-7ef9bfd12e27/mafft/multi_alignment.msa"
            },
            "params":{

            },
            "result":"Success",
            "return_code":0,
            "time":"2020-04-14 08:58:56"
         },
         "snpsites":{
            "command":"snp-sites -rmcv -o /jobs/vcf/2020-04-14-08-58-54_f3356a7f-140d-4520-8653-7ef9bfd12e27/snpsites/run /jobs/vcf/2020-04-14-08-58-54_f3356a7f-140d-4520-8653-7ef9bfd12e27/mafft/multi_alignment.msa &> /jobs/vcf/2020-04-14-08-58-54_f3356a7f-140d-4520-8653-7ef9bfd12e27/snpsites/snpsites.log",
            "config":{
               "multifa":"/jobs/vcf/2020-04-14-08-58-54_f3356a7f-140d-4520-8653-7ef9bfd12e27/references.fa",
               "workdir":"/jobs/vcf/2020-04-14-08-58-54_f3356a7f-140d-4520-8653-7ef9bfd12e27"
            },
            "input":{
               "msa":"/jobs/vcf/2020-04-14-08-58-54_f3356a7f-140d-4520-8653-7ef9bfd12e27/mafft/multi_alignment.msa"
            },
            "output":{
               "ref":"/jobs/vcf/2020-04-14-08-58-54_f3356a7f-140d-4520-8653-7ef9bfd12e27/snpsites/run.pseudoreference.fa",
               "snps":"/jobs/vcf/2020-04-14-08-58-54_f3356a7f-140d-4520-8653-7ef9bfd12e27/snpsites/run.vcf"
            },
            "params":{
               "prefix":"/jobs/vcf/2020-04-14-08-58-54_f3356a7f-140d-4520-8653-7ef9bfd12e27/snpsites/run"
            },
            "result":"Success",
            "return_code":0,
            "time":"2020-04-14 08:58:56"
         },
         "vcf_add_freqs":{
            "command":"format_vcf.py freq /jobs/vcf/2020-04-14-08-58-54_f3356a7f-140d-4520-8653-7ef9bfd12e27/vcf/run.1.vcf > /jobs/vcf/2020-04-14-08-58-54_f3356a7f-140d-4520-8653-7ef9bfd12e27/vcf/run.cleaned.vcf 2> /jobs/vcf/2020-04-14-08-58-54_f3356a7f-140d-4520-8653-7ef9bfd12e27/vcf/vcf_clean.2.log",
            "config":{
               "multifa":"/jobs/vcf/2020-04-14-08-58-54_f3356a7f-140d-4520-8653-7ef9bfd12e27/references.fa",
               "workdir":"/jobs/vcf/2020-04-14-08-58-54_f3356a7f-140d-4520-8653-7ef9bfd12e27"
            },
            "input":{
               "clean_vcf":"/jobs/vcf/2020-04-14-08-58-54_f3356a7f-140d-4520-8653-7ef9bfd12e27/vcf/run.1.vcf"
            },
            "output":{
               "freq_vcf":"/jobs/vcf/2020-04-14-08-58-54_f3356a7f-140d-4520-8653-7ef9bfd12e27/vcf/run.cleaned.vcf"
            },
            "params":{

            },
            "result":"Success",
            "return_code":0,
            "time":"2020-04-14 08:58:57"
         },
         "vcf_clean_header":{
            "command":"format_vcf.py clean /jobs/vcf/2020-04-14-08-58-54_f3356a7f-140d-4520-8653-7ef9bfd12e27/snpsites/run.vcf > /jobs/vcf/2020-04-14-08-58-54_f3356a7f-140d-4520-8653-7ef9bfd12e27/vcf/run.1.vcf 2> /jobs/vcf/2020-04-14-08-58-54_f3356a7f-140d-4520-8653-7ef9bfd12e27/vcf/vcf_clean.1.log",
            "config":{
               "multifa":"/jobs/vcf/2020-04-14-08-58-54_f3356a7f-140d-4520-8653-7ef9bfd12e27/references.fa",
               "workdir":"/jobs/vcf/2020-04-14-08-58-54_f3356a7f-140d-4520-8653-7ef9bfd12e27"
            },
            "input":{
               "base_vcf":"/jobs/vcf/2020-04-14-08-58-54_f3356a7f-140d-4520-8653-7ef9bfd12e27/snpsites/run.vcf"
            },
            "output":{
               "clean_vcf":"/jobs/vcf/2020-04-14-08-58-54_f3356a7f-140d-4520-8653-7ef9bfd12e27/vcf/run.1.vcf"
            },
            "params":{

            },
            "result":"Success",
            "return_code":0,
            "time":"2020-04-14 08:58:57"
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
It is possible to submit an `alias` for display, otherwise a the id will be set as alias.

### Request example
```bash
curl -i -F 'filetype=fasta' -F 'description=description-fasta' -F "file=@snakemake/example/references.fa" -F "cores=5" http://localhost:56733/api/vcf -F "alias=Fasta"


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
   "alias":"Fasta",
   "description":"description-fasta",
   "filename":"references.fa",
   "id":"2020-04-14-08-58-54_f3356a7f-140d-4520-8653-7ef9bfd12e27",
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
         "alias":"2020-04-14-09-04-15_05900aa7-26f2-4c30-8702-27267227dd2b",
         "description":"None",
         "filename":"sample.fq",
         "id":"2020-04-14-09-04-15_05900aa7-26f2-4c30-8702-27267227dd2b",
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
         "alias": "pending",
         "filename":"sample.fq",
         "id":"2020-04-14-09-04-15_83a17e72-dd69-4a7f-9c2f-5cb8d31db207",
         "params":{
            "cores":"4",
            "lenkmers":"35",
            "maxmem":"4",
            "maxocc":"300",
            "minocc":"100",
            "vcf":"202004-1010-0435_6fe0017f-2d0e-4023-b4c2-1fcfc0470b2f"
         },
         "status":"Pending"
      },
      {
         "alias":"job-malva",
         "description":"None",
         "filename":"sample.fq",
         "id":"2020-04-14-09-03-46_6a9964ad-5c43-4e74-98a2-69fb2b03affd",
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
curl -i http://localhost:56733/api/malva/2020-04-14-09-03-46_6a9964ad-5c43-4e74-98a2-69fb2b03affd
```
### Return example
```
HTTP/1.0 200 OK
Content-Type: application/json
Content-Length: 50
Server: Werkzeug/1.0.1 Python/3.6.9
Date: Wed, 08 Apr 2020 10:20:52 GMT

{
   "alias":"job-malva",
   "description":"None",
   "filename":"sample.fq",
   "id":"2020-04-14-09-03-46_6a9964ad-5c43-4e74-98a2-69fb2b03affd",
   "log":{
      "last_time":"2020-04-14 09:03:50",
      "status":"Completed",
      "steps":{
         "KMC":{
            "command":"kmc -t4 -m4 -k35 -ci100 -cs300 -fm /jobs/malva/2020-04-14-09-03-46_6a9964ad-5c43-4e74-98a2-69fb2b03affd/sample.fq /jobs/malva/2020-04-14-09-03-46_6a9964ad-5c43-4e74-98a2-69fb2b03affd/KMC/kmers /jobs/malva/2020-04-14-09-03-46_6a9964ad-5c43-4e74-98a2-69fb2b03affd/KMC/tmp &> /jobs/malva/2020-04-14-09-03-46_6a9964ad-5c43-4e74-98a2-69fb2b03affd/KMC/kmc.log",
            "config":{
               "cores":4,
               "lenkmers":35,
               "malvak":35,
               "maxmem":4,
               "maxocc":300,
               "minocc":100,
               "reference":"/jobs/vcf/202004-1010-0435_6fe0017f-2d0e-4023-b4c2-1fcfc0470b2f/snpsites/run.pseudoreference.fa",
               "sample":"/jobs/malva/2020-04-14-09-03-46_6a9964ad-5c43-4e74-98a2-69fb2b03affd/sample.fq",
               "vcf":"/jobs/vcf/202004-1010-0435_6fe0017f-2d0e-4023-b4c2-1fcfc0470b2f/vcf/run.cleaned.vcf",
               "workdir":"/jobs/malva/2020-04-14-09-03-46_6a9964ad-5c43-4e74-98a2-69fb2b03affd"
            },
            "input":{
               "sample":"/jobs/malva/2020-04-14-09-03-46_6a9964ad-5c43-4e74-98a2-69fb2b03affd/sample.fq"
            },
            "output":{
               "kmc_out":"/jobs/malva/2020-04-14-09-03-46_6a9964ad-5c43-4e74-98a2-69fb2b03affd/KMC/kmers.kmc_pre"
            },
            "params":{
               "kmc_prefix":"/jobs/malva/2020-04-14-09-03-46_6a9964ad-5c43-4e74-98a2-69fb2b03affd/KMC/kmers",
               "kmc_tmp":"/jobs/malva/2020-04-14-09-03-46_6a9964ad-5c43-4e74-98a2-69fb2b03affd/KMC/tmp",
               "lenkmers":35,
               "maxmem":4,
               "maxocc":300,
               "minocc":100
            },
            "result":"Success",
            "return_code":0,
            "time":"2020-04-14 09:03:48"
         },
         "malva":{
            "command":"malva-geno -1 -k 35 -r 35 -c 300 -b 1 /jobs/vcf/202004-1010-0435_6fe0017f-2d0e-4023-b4c2-1fcfc0470b2f/snpsites/run.pseudoreference.fa /jobs/vcf/202004-1010-0435_6fe0017f-2d0e-4023-b4c2-1fcfc0470b2f/vcf/run.cleaned.vcf /jobs/malva/2020-04-14-09-03-46_6a9964ad-5c43-4e74-98a2-69fb2b03affd/KMC/kmers > /jobs/malva/2020-04-14-09-03-46_6a9964ad-5c43-4e74-98a2-69fb2b03affd/malva/malva.vcf 2> /jobs/malva/2020-04-14-09-03-46_6a9964ad-5c43-4e74-98a2-69fb2b03affd/malva/malva.log",
            "config":{
               "cores":4,
               "lenkmers":35,
               "malvak":35,
               "maxmem":4,
               "maxocc":300,
               "minocc":100,
               "reference":"/jobs/vcf/202004-1010-0435_6fe0017f-2d0e-4023-b4c2-1fcfc0470b2f/snpsites/run.pseudoreference.fa",
               "sample":"/jobs/malva/2020-04-14-09-03-46_6a9964ad-5c43-4e74-98a2-69fb2b03affd/sample.fq",
               "vcf":"/jobs/vcf/202004-1010-0435_6fe0017f-2d0e-4023-b4c2-1fcfc0470b2f/vcf/run.cleaned.vcf",
               "workdir":"/jobs/malva/2020-04-14-09-03-46_6a9964ad-5c43-4e74-98a2-69fb2b03affd"
            },
            "input":{
               "kmc":"/jobs/malva/2020-04-14-09-03-46_6a9964ad-5c43-4e74-98a2-69fb2b03affd/KMC/kmers.kmc_pre",
               "ref":"/jobs/vcf/202004-1010-0435_6fe0017f-2d0e-4023-b4c2-1fcfc0470b2f/snpsites/run.pseudoreference.fa",
               "vcf":"/jobs/vcf/202004-1010-0435_6fe0017f-2d0e-4023-b4c2-1fcfc0470b2f/vcf/run.cleaned.vcf"
            },
            "output":{
               "vcf":"/jobs/malva/2020-04-14-09-03-46_6a9964ad-5c43-4e74-98a2-69fb2b03affd/malva/malva.vcf"
            },
            "params":{
               "c":300,
               "k":35,
               "kmc_prefix":"/jobs/malva/2020-04-14-09-03-46_6a9964ad-5c43-4e74-98a2-69fb2b03affd/KMC/kmers",
               "r":35
            },
            "result":"Success",
            "return_code":0,
            "time":"2020-04-14 09:03:50"
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

It is possible to submit an `alias` for display, otherwise a the id will be set as alias.

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
-F 'alias=job-malva' \
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