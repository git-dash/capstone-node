FROM node:10

# Create app directory
WORKDIR /rabitmq-service

COPY package.json ./

# Install app dependencies
RUN npm install

RUN npm install pm2 -g

# Bundle app source
COPY . .

EXPOSE 3005

CMD ["pm2", "start", "/rabitmq-service/pm2.config.js"]