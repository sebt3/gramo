// npm install @apollo/server express graphql cors
import { ApolloServer } from '@apollo/server';
import { expressMiddleware } from '@apollo/server/express4';
import { ApolloServerPluginDrainHttpServer } from '@apollo/server/plugin/drainHttpServer';
import express from 'express';
import http from 'http';
import cors from 'cors';
import fs from 'fs';
import path from 'path';
import { resolvers } from './resolvers/index.js';

const __dirname = path.resolve(path.dirname(''));
const importGraphQL = (file) => {return fs.readFileSync(path.join(__dirname, 'back', 'schema', file),"utf-8");}
const gqlWrapper = (...files)=>{return `${files}`;}
const typeDefs = gqlWrapper(
  importGraphQL('core.graphql'),
  importGraphQL('vynil.graphql'),
);

interface MyContext {
  token?: String;
}

const app = express();
const httpServer = http.createServer(app);
const server = new ApolloServer<MyContext>({
  typeDefs,
  resolvers,
  plugins: [ApolloServerPluginDrainHttpServer({ httpServer })],
});
await server.start();
app.use(
  '/graphql',
  cors<cors.CorsRequest>(),
  express.json(),
  expressMiddleware(server, {
    context: async ({ req }) => ({ token: req.headers.token }),
  }),
);

app.use(express.static('public'));
app.get('*', (req, res) => {
  res.sendFile(
      path.resolve(__dirname, 'public', 'index.html')
  );
});


await new Promise<void>((resolve) => httpServer.listen({ port: 3000 }, resolve));
console.log(`🚀 Server ready at http://localhost:3000/graphql`);