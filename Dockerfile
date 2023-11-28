FROM nginx:1.25.3-alpine as base
WORKDIR /usr/app
RUN apk add --update nodejs npm

COPY . .
RUN npm i
RUN npm run build

FROM base AS release
WORKDIR /usr/app
COPY --from=base /usr/app/build/ /usr/app/issue-tracker-client
COPY ./release/nginx/default.conf /etc/nginx/conf.d/default.conf

CMD [ "nginx", "-g", "daemon off;" ]