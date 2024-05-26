import { server, setup, app, httpServer, __dirname } from './main.js'
import express from 'express';
import path from 'path';
import { logger } from './logger.js'
const log = logger.child({componant:"index"});
const oneHour = 3_600_000 // 3600000msec => 1hour
const oneYear = oneHour * 24 * 365

await server.start();
setup();
app.get('/i18n/:file', (req, res) => {
  res.sendFile(path.resolve(__dirname, 'public', 'i18n', req.params.file), {headers: {
    'Content-Type': 'application/json'
  }});
});
app.use('/hrm', express.static('public', { maxAge: oneYear }));
app.get('*', (req, res) => {
  res.sendFile(
      path.resolve(__dirname, 'public', 'index.html')
  );
});

await new Promise<void>((resolve) => httpServer.listen({ port: 3000 }, resolve));
log.info(`☆ Gramo ☆ ready at http://localhost:3000/`);