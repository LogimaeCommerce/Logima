FROM node:10-alpine

ENV VS_ENV prod

WORKDIR /var/www

RUN apk add --no-cache curl git

COPY package.json ./

RUN apk add --no-cache --virtual .build-deps ca-certificates wget && \
    yarn install --no-cache && \
    apk del .build-deps

COPY docker/logima-pwa-api/logima-pwa-api.sh /usr/local/bin/

CMD ["logima-pwa-api.sh"]
