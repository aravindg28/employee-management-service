FROM node:10.15.3
WORKDIR /usr/src/app
COPY package.json /usr/src/app
RUN npm install && npm install -g sails
COPY . .
EXPOSE 1337
CMD sails lift