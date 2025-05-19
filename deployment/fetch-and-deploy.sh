#!/bin/sh
# fetch-and-deploy.sh
GATEWAY_PORT=8001 docker compose -f docker-compose.staging.yml pull
GATEWAY_PORT=8001 docker compose -f docker-compose.staging.yml down -v
GATEWAY_PORT=8001 docker compose -f docker-compose.staging.yml up -d -V
docker image prune -af