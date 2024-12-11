FROM node:18-alpine

WORKDIR /ccmapp

COPY package.json .

RUN npm install

COPY . .

EXPOSE 3000

CMD ["npm", "start"]