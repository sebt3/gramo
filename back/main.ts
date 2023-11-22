import { ApolloServer } from '@apollo/server';
import { expressMiddleware } from '@apollo/server/express4';
import { ApolloServerPluginDrainHttpServer } from '@apollo/server/plugin/drainHttpServer';
import express from 'express';
import http from 'http';
import cors from 'cors';
import fs from 'fs';
import path from 'path';
import { resolvers } from './resolvers/index.js';

export const __dirname = path.resolve(path.dirname(''));
const importGraphQL = (file) => {return fs.readFileSync(path.join(__dirname, 'back', 'schema', file),"utf-8");}
const gqlWrapper = (...files)=>{return `${files}`;}
const typeDefs = gqlWrapper(
  importGraphQL('core.graphql'),
  importGraphQL('vynil.graphql'),
  importGraphQL('fluxcd.helm.graphql'),
  importGraphQL('fluxcd.image.graphql'),
  importGraphQL('fluxcd.kustomize.graphql'),
  importGraphQL('fluxcd.notification.graphql'),
  importGraphQL('fluxcd.source.graphql'),
);

interface MyContext {
  token?: String;
}

export const app = express();
export const httpServer = http.createServer(app);
export const server = new ApolloServer<MyContext>({
  typeDefs,
  resolvers,
  plugins: [ApolloServerPluginDrainHttpServer({ httpServer })],
});
export function setup() {
  app.use(
    '/graphql',
    cors<cors.CorsRequest>(),
    express.json(),
    expressMiddleware(server, {
      context: async ({ req }) => ({ token: req.headers.token }),
    }),
  );
}
export default setup