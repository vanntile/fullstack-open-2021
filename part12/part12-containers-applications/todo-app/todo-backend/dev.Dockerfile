FROM node:16

WORKDIR /usr/src/app

COPY . .
RUN npm install -g nodemon && npm install

CMD npm run dev