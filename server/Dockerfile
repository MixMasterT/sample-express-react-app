FROM node:18

# Create app directory
WORKDIR /usr/src/app

# install nodemon
RUN npm i -g nodemon

# Install app dependencies
COPY package*.json ./

RUN npm ci --omit=dev

COPY . .

EXPOSE 8888

CMD [ "nodemon", "server.js" ]
