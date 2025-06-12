import { type Request, Router } from 'express';

import { db } from '@app/backend-shared';

const getParkUser = Router();

getParkUser.get('/park-user', async (req: Request, res) => {
  const userId = req.userId;

  if (userId === undefined) {
    res.json({
      ok: false,
      message: 'userId empty',
    });
    return;
  }

  const park = await db
    .selectFrom('parks')
    .select(['id', 'park_name'])
    .where('parks.user_id', '=', userId)
    .executeTakeFirst();

  if (!park) {
    res.json({
      ok: false,
      message: 'no park for this user',
    });
    return;
  }

  res.json({
    ok: true,
    park,
  });
});

export default getParkUser;
