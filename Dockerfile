FROM node:18-slim as builder
WORKDIR /usr/src
COPY package.json yarn.lock ./
RUN yarn install
COPY . ./
RUN yarn gen
RUN yarn build

FROM node:18-slim as target
ENV NODE_ENV=production
WORKDIR /usr/app
COPY package.json yarn.lock ./
RUN yarn install --production && yarn cache clean
COPY --from=builder /usr/src/dist/ .

EXPOSE 3000
CMD [ "node", "index.js" ]
