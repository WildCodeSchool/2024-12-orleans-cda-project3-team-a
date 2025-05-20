FROM node:22.14.0-alpine3.21

ENV NODE_ENV=production

WORKDIR /app

COPY package*.json tsconfig.json   /app/
COPY packages/shared               /app/packages/shared
COPY packages/backend/shared       /app/packages/backend/shared
COPY packages/backend/migrations   /app/packages/backend/migrations

RUN npm ci --ignore-scripts

CMD npm run migrations:latest
