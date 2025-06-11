#!/bin/sh
# fetch-and-deploy.sh
docker image prune -af
GATEWAY_PORT=8001 docker compose -f docker-compose.staging.yml pull
GATEWAY_PORT=8001 docker compose -f docker-compose.staging.yml down -v
GATEWAY_PORT=8001 docker compose -f docker-compose.staging.yml up -d -V