import { type Request, Router } from 'express';
import { sql } from 'kysely';

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
    .select(['id', 'park_name', 'wallet'])
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
    .where('park_visitors.exit_time', '>', sql<Date>`NOW()`)
    .executeTakeFirst();

  const visitorsCount = visitorsCountResult?.count ?? 0;

  res.json({
    ok: true,
    park,
    visitorsCount,
  });
});

export default getParkUser;
