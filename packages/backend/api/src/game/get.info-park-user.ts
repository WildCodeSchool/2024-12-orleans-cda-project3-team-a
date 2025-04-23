import express from 'express';

import { db } from '@app/backend-shared';

const getInfoParkUser = express.Router();

getInfoParkUser.get('/info-park-user', async (req, res) => {
  //PLUS TARD récupérer l'id dans le cookie !
  //http://192.168.0.54:3333/api/game/info-park-user
  const userId = 8;

  const parkInfo = await db
    .selectFrom('parks')
    .selectAll()
    .where('parks.user_id', '=', userId)
    .executeTakeFirst();

  if (!parkInfo) {
    res.json({
      message: 'no user corresponding',
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
