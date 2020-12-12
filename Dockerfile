FROM node:14 as build

RUN mkdir /build
WORKDIR /build

ADD package.json .
ADD yarn.lock .
RUN yarn --freeze-lockfile
ADD rollup.config.js .
ADD src src
ADD public public

RUN yarn build

FROM nginx

COPY --from=build /build/public /usr/share/nginx/html
