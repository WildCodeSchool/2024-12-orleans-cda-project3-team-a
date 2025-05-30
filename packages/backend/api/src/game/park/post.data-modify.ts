import type { Request } from 'express';
import express from 'express';

import { db } from '@app/backend-shared';

const postPark = express.Router();

postPark.post('/data-modify', async (req: Request, res) => {
  const userId = req.userId;

  const { newUserName } = req.body;
  const { newParkName } = req.body;

  if (userId === undefined) {
    res.json({
      ok: false,
      message: ' no user id found',
    });
    return;
  }

  await db.transaction().execute(async (trx) => {
    await trx
      .updateTable('users')
      .set({ username: newUserName })
      .where('id', '=', userId)
      .execute();

    await trx
      .updateTable('parks')
      .set({ park_name: newParkName })
      .where('user_id', '=', userId)
      .execute();
  });

  res.json({
    message: 'Data modified',
    ok: true,
  });
});

export default postPark;
