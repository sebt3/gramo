import { ApolloServer } from '@apollo/server';
import { expressMiddleware } from '@apollo/server/express4';
import { ApolloServerPluginLandingPageLocalDefault, ApolloServerPluginLandingPageProductionDefault } from '@apollo/server/plugin/landingPage/default';
import { ApolloServerPluginDrainHttpServer } from '@apollo/server/plugin/drainHttpServer';
import express from 'express';
import http from 'http';
import cors from 'cors';
import fs from 'fs';
import path from 'path';
import { resolvers } from './resolvers/index.js';
import { gramoConfig } from './config.js'

export const __dirname = path.resolve(path.dirname(''));
const importGraphQL = (file) => {return fs.readFileSync(path.join(__dirname, 'back', 'schema', file),"utf-8");}
const gqlWrapper = (...files)=>{return `${files}`;}
const typeDefs = gqlWrapper(
  importGraphQL('core.graphql'),
  importGraphQL('k8sNamespace.graphql'),
  importGraphQL('k8s.graphql'),
  importGraphQL('cnpg.graphql'),
  importGraphQL('fluxcd.graphql'),
  importGraphQL('k8up.graphql'),
  importGraphQL('mariadb.graphql'),
  importGraphQL('mongodb.graphql'),
  importGraphQL('monitoring.graphql'),
  importGraphQL('oracle.graphql'),
  importGraphQL('projectcalico.graphql'),
  importGraphQL('rabbitmq.graphql'),
  importGraphQL('redis.graphql'),
  importGraphQL('traefik.graphql'),
  importGraphQL('vynil.graphql'),
  importGraphQL('zalando.graphql'),
  importGraphQL('secretgenerator.graphql'),
  importGraphQL('certmanager.graphql'),
  importGraphQL('opentelemetry.graphql'),
  importGraphQL('jaegertracing.graphql'),
  importGraphQL('cattle.graphql'),
  importGraphQL('cilium.graphql'),
  importGraphQL('namecheap.graphql'),
  importGraphQL('tekton.graphql'),
);

interface MyContext {
  token?: String;
}
export const app = express();
export const httpServer = http.createServer(app);
const apolloPlugins = [ApolloServerPluginDrainHttpServer({ httpServer })]
if (gramoConfig.enableGraphQLClient||process.env.NODE_ENV !== 'production')
  apolloPlugins.push(ApolloServerPluginLandingPageLocalDefault());
else
  apolloPlugins.push(ApolloServerPluginLandingPageProductionDefault());
export const server = new ApolloServer<MyContext>({
  typeDefs,
  resolvers,
  introspection: gramoConfig.enableGraphQLClient||process.env.NODE_ENV !== 'production',
  plugins: apolloPlugins,
});
export function setup() {
  app.use(
    '/graphql',
    cors<cors.CorsRequest>(),
    express.json({limit: '25mb'}),
    expressMiddleware(server, {
      context: async ({ req }) => ({ token: req.headers.token }),
    }),
  );
}
export default setup
