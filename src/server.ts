import express from 'express';
import { join } from 'path';
import {
  AngularNodeAppEngine,
  createNodeRequestHandler,
  isMainModule,
  writeResponseToNodeResponse,
} from '@angular/ssr/node';

const browserDistFolder = join(__dirname, 'dist/browser');

const app = express();
const angularApp = new AngularNodeAppEngine();

// Servir archivos estáticos
app.use(
  express.static(browserDistFolder, {
    maxAge: '1y',
    index: false,
    redirect: false,
  }),
);

// Rutas Angular SSR
app.use((req, res, next) => {
  angularApp
    .handle(req)
    .then(response =>
      response ? writeResponseToNodeResponse(response, res) : next(),
    )
    .catch(next);
});

// Levantar servidor
if (isMainModule(import.meta.url) || process.env['pm_id']) {
  const port = process.env.PORT || 4000;
  app.listen(port, () => {
    console.log(`Node server listening on http://localhost:${port}`);
  });
}

export const reqHandler = createNodeRequestHandler(app);

