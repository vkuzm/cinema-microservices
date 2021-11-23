FROM node:17-alpine as builder
WORKDIR '/app'
COPY ./package.json ./
RUN apk update && \
	apk add python2 build-base gcc && \
	npm install
COPY . .
RUN npm run build

FROM nginx
EXPOSE 3000
COPY nginx-client.conf /etc/nginx/conf.d/default.conf
COPY --from=builder /app/build /usr/share/nginx/html