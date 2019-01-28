FROM node:8.15-alpine

ENV NODE_ENV=development

WORKDIR /src

COPY ./package*.json ./

RUN apk add --update \
    && npm i npm@latest -g \
    && npm install

COPY ./ ./

EXPOSE 3000

CMD ["npm", "start"]
