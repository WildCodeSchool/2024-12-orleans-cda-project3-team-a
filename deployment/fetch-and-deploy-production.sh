#!/bin/sh
# fetch-and-deploy.sh
docker image prune -af
GATEWAY_PORT=8000 docker compose -f docker-compose.production.yml pull
GATEWAY_PORT=8000 docker compose -f docker-compose.production.yml down -v
GATEWAY_PORT=8000 docker compose -f docker-compose.production.yml up -d -V