import { type Request, Router } from 'express';

import { db } from '@app/backend-shared';

import authGuard from '@/middlewares/auth.guard';

function getUser(userId: number) {
  return db
    .selectFrom('users')
    .leftJoin('parks', 'users.id', 'parks.user_id')
    .leftJoin('avatars', 'users.avatar_id', 'avatars.id')
    .select([
      'users.id',
      'users.username',
      'users.email',
      'parks.id as parkId',
      'users.avatar_id',
      'avatars.src_image',
    ])
    .where('users.id', '=', userId)
    .executeTakeFirst();
}

export type User = Awaited<ReturnType<typeof getUser>>;

const getMeRouter = Router();

getMeRouter.get('/me', authGuard, async (req: Request, res) => {
  const userId = req.userId;

  if (userId === undefined) {
    res.json({
      ok: false,
    });
    return;
  }

  const user = await getUser(userId);

  if (!user) {
    res.json({
      ok: false,
      message: 'user is empty',
    });
    return;
  }

  res.json({
    ok: true,
    message: 'user retrieve',
    user,
  });
});

export default getMeRouter;
