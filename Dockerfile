#!/bin/bash

FROM node:14-slim as build

WORKDIR /app

COPY package*.json ./

RUN npm install

COPY . .

 RUN npm run setup

EXPOSE 3000

CMD ["node", "server.js"]