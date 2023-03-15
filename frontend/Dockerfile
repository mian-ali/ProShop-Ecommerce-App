


FROM node:16-alpine

ENV NODE_ENV production

WORKDIR /app

COPY package*.json .

RUN npm ci --omit=dev

COPY . .

EXPOSE 3000

CMD ["serve", "-s", "build", "-l", "8080"]