FROM node:22-alpine

WORKDIR /app

#copy package-lock and package json into current dir
# layer caching
COPY package*.json ./

RUN npm install

COPY  . .

EXPOSE 8080

CMD ["node", "src/index.js"]