import express from 'express';

import { db } from '@app/backend-shared';

const getInfoParkUser = express.Router();

getInfoParkUser.get('/info-park-user', async (req, res) => {
  //PLUS TARD récupérer l'id dans le cookie !
  //http://192.168.0.54:3333/api/game/info-park-user
  const userId = 1;

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

  res.json({
    parkInfo,
  });
});

export default getInfoParkUser;
