FROM node:14 AS node-modules
WORKDIR /app
COPY package.json package-lock.json ./
RUN npm install

FROM node-modules AS production-bundle
WORKDIR /app
COPY . .
RUN npm run-script build

FROM nginx:stable-alpine AS production-server
WORKDIR /app
COPY --from=production-bundle /app/build /app
COPY deploy/nginx-server.conf /etc/nginx/conf.d/default.conf
COPY deploy/htpasswd /etc/nginx/htpasswd