#!/bin/bash
export DOCKER_BUILDKIT=1

CNT=malvirus
VOL=malvirus_jobs
PORT=56733

docker build --tag $CNT . || exit 1

if docker ps -a -f name=$CNT --format "{{.Names}}" | grep -w $CNT > /dev/null
then
    docker rm $CNT
fi

docker run --name $CNT \
    -p $PORT:80 \
    --mount type=volume,source=$VOL,target=/jobs \
    $CNT
