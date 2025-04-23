import express from 'express';

import { db } from '@app/backend-shared';

const getBarrier = express.Router();

getBarrier.get('/barrier', async (req, res) => {
  const parkId = 3;

  const barrier = await db
    .selectFrom('park_decorations')
    .innerJoin('decorations', 'decorations.id', 'park_decorations.deco_id')
    .select(['park_id', 'deco_id', 'name', 'price'])
    .where('park_decorations.park_id', '=', parkId)
    .execute();

  if (!barrier) {
    res.json({
      ok: false,
    });
    return;
  }

  res.json({
    barrier,
  });
});

export default getBarrier;
