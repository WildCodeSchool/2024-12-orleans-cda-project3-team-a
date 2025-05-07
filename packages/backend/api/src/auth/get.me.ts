import { type Request, Router } from 'express';

import { db } from '@app/backend-shared';

import authGuard from '@/middlewares/auth.guard';

const getMeRouter = Router();

getMeRouter.get('/me', authGuard, async (req: Request, res) => {
  const userId = req.userId;

  if (userId === undefined) {
    res.json({
      ok: false,
    });
    return;
  }

  try {
    const user = await db
      .selectFrom('users')
      .select(['users.id', 'users.email'])
      .where('users.id', '=', userId)
      .executeTakeFirst();

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
  } catch (error) {
    res.json({
      ok: false,
      message: 'get me failed',
    });
  }
});

export default getMeRouter;
