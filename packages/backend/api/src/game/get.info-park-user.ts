import { type Request, Router } from 'express';

import { db } from '@app/backend-shared';

const getInfoParkUser = Router();

getInfoParkUser.get('/info-park-user', async (req: Request, res) => {
  const userId = req.userId;
  // const userId = 7;

  if (userId == null) {
    res.json({
      ok: false,
      message: 'userId empty',
    });
    return;
  }

  const parkInfo = await db
    .selectFrom('parks')
    .selectAll()
    .where('parks.user_id', '=', userId)
    .executeTakeFirst();

  if (!parkInfo) {
    res.json({
      ok: false,
      message: 'no park for this user',
    });
    return;
  }

  const visitorsCountResult = await db
    .selectFrom('park_visitors')
    .select(({ fn }) => [fn.countAll<number>().as('count')])
    .where('park_visitors.park_id', '=', parkInfo.id)
    .executeTakeFirst();

  const visitorsCount = visitorsCountResult?.count ?? 0;

  res.json({
    parkInfo,
    visitorsCount,
  });
});

export default getInfoParkUser;
