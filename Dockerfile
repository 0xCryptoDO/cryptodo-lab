FROM node:16

WORKDIR /home/cryptodo-lab

COPY package.json yarn.lock ./

RUN yarn install

COPY . .

RUN yarn build

CMD ["yarn", "start"]
