FROM node:16

RUN mkdir -p  /usr/src/app && chown -R node:node  /usr/src/app

USER node
WORKDIR /usr/src/app

COPY --chown=node:node . .
RUN npm ci && npm run tsc

CMD npm start
