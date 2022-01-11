FROM node:16 AS test-stage

WORKDIR /usr/src/app

COPY . .

RUN npm ci && CI=true npm test

FROM node:16 AS build-stage

WORKDIR /usr/src/app

COPY --from=test-stage /usr/src/app /usr/src/app

RUN npm run build

FROM nginx:1.20-alpine

COPY --from=build-stage /usr/src/app/build /usr/share/nginx/html
