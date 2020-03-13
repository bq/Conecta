FROM node:12.14.1

RUN mkdir -p /usr/src/app
WORKDIR /usr/src/app/

COPY . ./

RUN yarn install

ENV NODE_ENV=production

WORKDIR /usr/src/app/packages/app/frontend
RUN yarn run build

EXPOSE 3000

RUN chmod +x /usr/src/app/docker-entrypoint.sh

ENTRYPOINT ["/usr/src/app/docker-entrypoint.sh"]
