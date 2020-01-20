FROM node:10

# Create app directory
WORKDIR /search-restaurants

COPY package.json ./

# Install app dependencies
RUN npm install

RUN npm install pm2 -g

# Bundle app source
COPY . .

EXPOSE 3000
#CMD ["npm" ,"start"]
CMD ["pm2", "start", "search-restaurants/pm2.config.js"]