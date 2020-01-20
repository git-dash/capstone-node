FROM node:10

# Create app directory
WORKDIR /order-service

COPY package.json ./

# Install app dependencies
RUN npm install

RUN npm install pm2 -g

# Bundle app source
COPY . .

EXPOSE 3001

CMD ["pm2", "start", "/order-service/pm2.config.js"]