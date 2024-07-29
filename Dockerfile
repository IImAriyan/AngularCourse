FROM node:alpine

RUN npm install
RUN npm install -g @angular/cli

COPY . /app
WORKDIR /app
CMD ng serve
