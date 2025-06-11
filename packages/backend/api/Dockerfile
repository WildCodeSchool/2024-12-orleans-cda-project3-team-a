# api
FROM node:22.14.0-alpine3.21 AS build

WORKDIR /app

COPY package*.json            /app
COPY packages/shared          /app/packages/shared
COPY packages/backend/shared  /app/packages/backend/shared
COPY packages/backend/api     /app/packages/backend/api

RUN npm ci --ignore-scripts

ENV NODE_ENV=production

RUN npm run build:backend:api

FROM node:22.14.0-alpine3.21 AS app

ENV NODE_ENV=production

WORKDIR /app

COPY packages/backend/api/package.production.json /app/package.json

RUN npm i --ignore-scripts

COPY --from=build /app/packages/backend/api/dist/index.js /app

CMD node /app/index.js
