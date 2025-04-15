import express from 'express';

import { db } from '@app/backend-shared';

const getWalletRouter = express.Router();
// const USER_ID = 1;

getWalletRouter.get('/wallet', async (req, res) => {
  //on va récupérer le user id dans l'url
  //http://192.168.0.54:3333/api/game/wallet?userId=1
  const { userId } = req.query;

  const park = await db
    .selectFrom('parks')
    .selectAll()
    .where('parks.user_id', '=', Number(userId))
    .executeTakeFirst();

  if (!park) {
    res.json({
      message: 'Pas de user correspondant',
    });
    return;
  }

  res.json({
    park,
  });
});

export default getWalletRouter;
