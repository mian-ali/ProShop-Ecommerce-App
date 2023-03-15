

FROM node:16-alpine

WORKDIR /src/app

COPY . .

ENV NODE_ENV production

RUN npm i

RUN npm run build

RUN npm install -g serve

EXPOSE 8000