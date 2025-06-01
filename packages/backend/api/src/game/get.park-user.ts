import { type Request, Router } from 'express';

import { db } from '@app/backend-shared';

const getParkUser = Router();

getParkUser.get('/park-user', async (req: Request, res) => {
  const userId = req.userId;

  if (userId == null) {
    res.json({
      ok: false,
      message: 'userId empty',
    });
    return;
  }

  const userCredentials = await db
    .selectFrom('users')
    .innerJoin('avatars', 'users.avatar_id', 'avatars.id')
    .select(['users.username', 'users.password_hash', 'avatars.src_image'])
    .where('users.id', '=', userId)
    .executeTakeFirst();

  const park = await db
    .selectFrom('parks')
    .selectAll()
    .where('parks.user_id', '=', userId)
    .executeTakeFirst();

  if (!park) {
    res.json({
      ok: false,
      message: 'no park for this user',
    });
    return;
  }

  const visitorsCountResult = await db
    .selectFrom('park_visitors')
    .select(({ fn }) => [fn.countAll<number>().as('count')])
    .where('park_visitors.park_id', '=', park.id)
    .executeTakeFirst();

  const visitorsCount = visitorsCountResult?.count ?? 0;

  res.json({
    park,
    visitorsCount,
    userCredentials,
  });
});

export default getParkUser;
