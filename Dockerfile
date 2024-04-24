FROM node:latest AS base
# build server
WORKDIR /usr/src/app
COPY ./server/package*.json ./
RUN npm ci --omit=dev


FROM base as build
WORKDIR /
RUN apt-get update && apt-get install -y --no-install-recommends dumb-init

# build client
WORKDIR /usr/src/app/client
COPY ./client .
RUN npm i
RUN npm run build


FROM node:20.12.2-bookworm-slim AS prod

ENV NODE_ENV=production
ENV PORT=3000

COPY --from=build /usr/bin/dumb-init /usr/bin/dumb-init
USER node
WORKDIR /usr/src/app
COPY --chown=node:node --from=base /usr/src/app/node_modules ./node_modules
COPY --chown=node:node ./server .
COPY --chown=node:node --from=build /usr/src/app/client/dist/ ./src/public

#HEALTHCHECK

EXPOSE $PORT

CMD ["dumb-init", "node", "./src/bin/www.js"]


FROM node:20.12.2-bookworm-slim AS server-dev

ENV NODE_ENV=development
ENV PORT=3000

WORKDIR /usr/src/app
COPY ./server .
RUN npm i

EXPOSE $PORT

CMD npm run dev


FROM node:20.12.2-bookworm-slim AS client-dev

ENV NODE_ENV=development
ENV PORT=5173

WORKDIR /usr/src/app
COPY ./client .
RUN npm i

EXPOSE $PORT

CMD npm run dev

