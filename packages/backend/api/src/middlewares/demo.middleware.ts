import type { NextFunction } from 'express';

export default function demoMiddleware(
  _req: Request,
  _res: Response,
  next: NextFunction,
) {
  // eslint-disable-next-line no-console
  console.log('Coucou from demo.middleware !');

  next();
}
