import * as express from 'express';
import * as cors from 'cors';
import { APP_PORT } from './config';
import console = require('console');
import { routes } from './routes';
import * as path from 'path';

(async () => {
  const staticDir = path.resolve(__dirname, '../static');
  const publicDir = path.resolve(__dirname, '../public');

  // Express
  const app = express()
    .use(cors())
    .use('/static', express.static(staticDir))
    .use(express.static(publicDir))
    .use(routes);

  app.listen(process.env.PORT || { port: APP_PORT }, () => {
    // eslint-disable-next-line no-console
    console.log('🎉 Server is running at ' + `http://localhost:${APP_PORT}`);
  });
})();
