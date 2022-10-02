FROM node:16-alpine
WORKDIR '/app'
COPY ./package.json ./
RUN apk update && \
	apk add python3 build-base gcc && \
	npm install
COPY . .
CMD ["npm", "run", "start"]