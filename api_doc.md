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
  "content": "list of vcfs"
}
```

# GET /vcf/:id
Get the details of the specified VCF

### Request example
```bash
curl -i http://localhost:56733/api/vcf/312das
```
### Return example
```
HTTP/1.0 200 OK
Content-Type: application/json
Content-Length: 56
Server: Werkzeug/1.0.1 Python/3.6.9
Date: Wed, 08 Apr 2020 08:53:42 GMT

{
  "content": "vcf file/csv/tsv?", 
  "id": "312das"
}
```

# POST /vcf
Upload a new precompiled VCF or a FASTA of references to compute a VCF from.

### Request documentation
The form should submit the file and an value `filetype=vcf/fasta`. A missing or illegal filetype will result in a 400.

### Request example
```bash
curl -i -F 'filetype=fasta' -F "file=@test.fa" http://localhost:56733/api/vcf

curl -i -F 'filetype=vcf' -F "file=@test.vcf" http://localhost:56733/api/vcf
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