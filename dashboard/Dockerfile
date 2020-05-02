FROM node:13-alpine

WORKDIR /dashboard

COPY package.json yarn.lock ./

RUN yarn install

COPY . .

EXPOSE 3000
