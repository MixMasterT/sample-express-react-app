FROM node:18

# Create app directory
WORKDIR /usr/src/app

# Update this later to run npm build, and then copy in only copy the build folder
COPY . .

RUN npm i -g vite

RUN npm i

EXPOSE 5173

# Update this later to use direct node command on built output
CMD [ "npm", "run", "dev" ]
