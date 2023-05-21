FROM node:18.0-alpine
LABEL authors="https://github.com/CyberManMatt"

WORKDIR /app

COPY . /app

RUN npm install

EXPOSE 3000

CMD ["node", "bin/www"]