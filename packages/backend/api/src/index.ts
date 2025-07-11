import cookieParser from 'cookie-parser';
import express from 'express';

import { env } from '@app/shared';

import './cron/cron.delete-visitors-inactive';
import './cron/cron.update.visitors';
import router from './router';

env();

const app = express();

const HOST = process.env.BACKEND_HOST ?? 'localhost';
const PORT = process.env.BACKEND_PORT ?? 3000;
const COOKIE_SECRET = process.env.COOKIE_SECRET ?? 'secret';

app.use(cookieParser(COOKIE_SECRET));
app.use(express.json());

app.use('/api', router);

//allow to make test one by one
if (process.env.NODE_ENV !== 'test') {
  app.listen(PORT, () => {
    // eslint-disable-next-line no-console
    console.log(`Server is listening on http://${HOST}:${PORT}`);
  });
}

declare module 'Express' {
  // eslint-disable-next-line @typescript-eslint/consistent-type-definitions
  interface Request {
    isAuthenticated?: boolean;
    userId?: number;
    parkId?: number;
  }
}

export default app;
export type * from './types';
