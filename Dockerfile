FROM node:alpine

WORKDIR /pis/5

COPY package*.json ./
COPY tsconfig.json ./
COPY nodemon.json ./
COPY src ./src
COPY .env ./

EXPOSE 3000

RUN ls -a
RUN npm i
RUN npm run build
CMD ["npm", "run", "start"]