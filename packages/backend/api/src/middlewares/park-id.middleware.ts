import type { NextFunction, Request, Response } from 'express';

import { db } from '@app/backend-shared';

export default async function parkIdMiddleware(
  req: Request,
  res: Response,
  next: NextFunction,
) {
  const userId = req.userId;

  if (userId == null) {
    res.json({
      ok: false,
      message: 'userId empty',
    });
    return;
  }

  //find the parkId thanks to userId
  const park = await db
    .selectFrom('users')
    .innerJoin('parks', 'parks.user_id', 'users.id')
    .select('parks.id as parkId')
    .where('users.id', '=', userId)
    .executeTakeFirst();

  //check if we have a park with the userId
  if (!park) {
    res.json({
      message: 'park not found',
      ok: false,
    });
    return;
  }

  //put the parkId in request
  req.parkId = park.parkId;

  next();
}
