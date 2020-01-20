FROM node:10

# Create app directory
WORKDIR /nodemailer-service

COPY package.json ./

# Install app dependencies
RUN npm install

RUN npm install pm2 -g

# Bundle app source
COPY . .

EXPOSE 3010

CMD ["pm2", "start", "/nodemailer-service/pm2.config.js"]