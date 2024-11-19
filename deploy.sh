#!/bin/sh

cd /home/ubuntu/glimpse-backend

npm ci

DOCKER_IMAGE_NAME=server-img

DOCKER_CONTAINER_NAME=server-container

docker system prune -a -f

docker rm -f $(docker ps -qa)

docker build -t ${DOCKER_IMAGE_NAME} . # <--- 프로젝트 루트 경로에 대한 상대경로

docker run -d -p 80:8080 -e NODE_ENV=${NODE_ENV} --name ${DOCKER_CONTAINER_NAME} ${DOCKER_IMAGE_NAME}