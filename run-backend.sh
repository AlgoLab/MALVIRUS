#!/bin/bash

CNT=backend

docker build -t $CNT .

if docker ps -a -f name=$CNT --format "{{.Names}}" | grep -w $CNT > /dev/null
then
    docker start -a $CNT
else
    docker run --name $CNT -p 56733:80 -v $PWD/flask:/app -v $PWD/snakemake:/snakemake $CNT
fi
