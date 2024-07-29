FROM node:alpine
COPY . /app
WORKDIR /app
CMD ng serve
