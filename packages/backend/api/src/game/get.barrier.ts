import express from 'express';

import { db } from '@app/backend-shared';

const getBarrier = express.Router();

getBarrier.get('/barrier', async (req, res) => {
  const parkId = 5;
  const zoneId = 1;

  const barrier = await db
    .selectFrom('decorations')
    .leftJoin('park_decorations', (join) =>
      join
        .onRef('decorations.id', '=', 'park_decorations.deco_id')
        .on('park_decorations.park_id', '=', parkId),
    )
    .where('decorations.zone_id', '=', zoneId) // ou un autre filtre selon le cas
    .selectAll()
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
