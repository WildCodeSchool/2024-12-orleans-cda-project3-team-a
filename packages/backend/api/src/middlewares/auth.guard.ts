import type { NextFunction, Request, Response } from 'express';

export default function authGuard(
  req: Request,
  res: Response,
  next: NextFunction,
) {
  if (req.isAuthenticated === true) {
    next();
    return;
  }

  res.json({
    ok: false,
  });
}
