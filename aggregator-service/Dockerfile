FROM node:10

# Create app directory
WORKDIR /aggregator-service

COPY package.json ./

# Install app dependencies
RUN npm install

RUN npm install pm2 -g

# Bundle app source
COPY . .

EXPOSE 3002

CMD ["pm2", "start", "/aggregator-service/pm2.config.js"]
