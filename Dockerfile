FROM node:16.17.0-alpine as builder

RUN apk add --no-cache make python3 git

WORKDIR /app

# Sources
COPY src /app/src
COPY public /app/public
COPY .env /app/.env
COPY nginx.conf /app/nginx.conf

# Install
COPY package.json /app/package.json
COPY yarn.lock /app/yarn.lock

# Config
COPY tsconfig.json /app/tsconfig.json

# Build
RUN yarn
RUN yarn build

# Clean
RUN rm -rf /app/yarn.lock
RUN rm -rf /app/tsconfig.json
RUN rm -rf /app/src

EXPOSE 80

FROM nginx:latest

WORKDIR /usr/share/nginx/html

RUN rm -rf ./*

COPY --from=builder /app/build .
COPY --from=builder /app/nginx.conf /etc/nginx/conf.d/default.conf

ENTRYPOINT ["nginx", "-g", "daemon off;"]
