#!/usr/bin/env -S npx tsx
import { server, setup, app, httpServer } from './main.js'
import { createServer as createViteServer } from 'vite'
import { logger } from './logger.js'
const log = logger.child({componant:"dev"});

await server.start();
setup();
const vite = await createViteServer({
  server: {
    hmr: {
      server: httpServer,
      clientPort: 80,
    },
    middlewareMode: true
  }
})
app.use((req, res, next) => {
  vite.middlewares.handle(req, res, next)
})

await new Promise<void>((resolve) => httpServer.listen({ port: 3000 }, resolve));
log.info(`☆ Gramo ☆ ready at http://localhost:3000/graphql`);