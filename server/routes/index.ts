import * as path from 'path';
import * as express from 'express';
import * as request from 'request';
import { RESOURCE_HOST, RESOURCE_PROTOCOL } from '../config';

const router = express.Router();
const staticDir = path.resolve(__dirname, '../../static');

// Bind /api/* to original API server
router.use('/api', (req, res) => {
  const boundPath = `${RESOURCE_PROTOCOL}://${RESOURCE_HOST}${req.path}`;
  // eslint-disable-next-line no-console
  console.log(boundPath);
  req.pipe(request(boundPath)).pipe(res);
});

// Service worker
router.use('/sw.js', (_, res) => {
  res.sendFile(path.resolve(staticDir, 'sw.js'));
});

router.use('/*', (_, res) => {
  res.sendFile(path.resolve(staticDir, 'index.html'));
});

export const routes = router;
