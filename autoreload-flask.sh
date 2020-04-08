#!/bin/bash

LAST="pippo"

inotifywait -m -r flask/app -e close_write -e modify -e move -e create -e delete |
    while read variabile
    do
        NOW=$(date -Iseconds)
        if [ "$LAST" != "$NOW" ]
        then
            echo $NOW
            LAST=$NOW
        fi
    done |
    while read var2
    do
        echo "[$var2] Waiting 1s..."
        sleep 1s
        echo "[$var2] Touching for activating reload..."
        touch flask/uwsgi.ini
    done
