FROM node:16-alpine as builder
WORKDIR '/app'
COPY ./package.json ./
RUN apk update && \
	apk add python3 build-base gcc && \
	npm install
COPY . .
RUN npm run build

FROM nginx:1.21.4-alpine
EXPOSE 3000
COPY nginx-client.conf /etc/nginx/conf.d/default.conf
COPY --from=builder /app/build /usr/share/nginx/html