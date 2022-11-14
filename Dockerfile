FROM node:16-alpine

WORKDIR /typefrom

ADD 'package.json' './package.json'
ADD 'package-lock.json' './package-lock.json'

RUN npm install

ADD '.' '.'

RUN npm run build

ARG port=80
ENV PORT=$port
ENV VALIDDOMAIN="localhost"
ENV TABNAME="Evaluation"

EXPOSE $port

CMD npm run serve
