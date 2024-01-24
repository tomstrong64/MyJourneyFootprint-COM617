FROM node:latest AS build
RUN apt-get update && apt-get install -y --no-install-recommends dumb-init

WORKDIR /usr/src/app
COPY package*.json /usr/src/app/
ENV NODE_ENV=production
RUN npm ci --omit=dev


FROM node:20.9.0-bookworm-slim

ENV NODE_ENV=production
COPY --from=build /usr/bin/dumb-init /usr/bin/dumb-init
USER node
WORKDIR /usr/src/app
COPY --chown=node:node --from=build /usr/src/app/node_modules /usr/src/app/node_modules
COPY --chown=node:node . /usr/src/app

HEALTHCHECK --interval=30s --timeout=5s --start-period=10s --retries=3 CMD npm run healthcheck

CMD ["dumb-init", "npm", "run", "prod"]