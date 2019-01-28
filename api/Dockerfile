FROM node:8-alpine

ENV NODE_ENV=production

WORKDIR /src

COPY ./package*.json ./

RUN apk add --update \
    && npm i npm@latest -g \
    && npm install

COPY ./ ./

EXPOSE 3000

CMD ["npm", "start"]
