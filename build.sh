#!/bin/bash

TAG=$(date +%Y.%m.%d.%H.%M)
echo "Building cohort-sample:$TAG"

docker build -t cohort-sample:"$TAG" .
