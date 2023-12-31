import { server, setup, app, httpServer, __dirname } from './main.js'
import express from 'express';
import path from 'path';

await server.start();
setup();
app.use(express.static('public'));
app.get('*', (req, res) => {
  res.sendFile(
      path.resolve(__dirname, 'public', 'index.html')
  );
});

await new Promise<void>((resolve) => httpServer.listen({ port: 3000 }, resolve));
console.log(`🚀 Server ready at http://localhost:3000/graphql`);