import { type Request, Router } from 'express';

import { db } from '@app/backend-shared';

const getWallet = Router();

getWallet.get('/wallet', async (req: Request, res) => {
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
    .select('wallet')
    .where('parks.user_id', '=', userId)
    .executeTakeFirst();

  if (!park) {
    res.json({
      ok: false,
      message: 'no wallet for this user',
    });
    return;
  }

  if (park.wallet === null) {
    res.json({
      ok: false,
      message: 'no wallet for this user',
    });
    return;
  }

  res.json({
    ok: true,
    park,
  });
});

export default getWallet;
