#!/bin/bash

CNT=backend

docker build -t $CNT . || exit 1

if docker ps -a -f name=$CNT --format "{{.Names}}" | grep -w $CNT > /dev/null
then
    docker rm $CNT
fi

docker run --name $CNT \
    -p 56733:80 \
    -v $PWD/flask:/app \
    -v $PWD/snakemake:/snakemake \
    $CNT
