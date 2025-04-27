//Request to know if the user has the barrier or not in his park
import express from 'express';

import { db } from '@app/backend-shared';

const getBarrier = express.Router();

getBarrier.get('/barrier', async (req, res) => {
  const parkId = 3;
  const zoneId = 3;

  const barrier = await db
    .selectFrom('decorations')
    .leftJoin('park_decorations', (join) =>
      join
        .onRef('decorations.id', '=', 'park_decorations.deco_id')
        .on('park_decorations.park_id', '=', parkId),
    )
    .where('decorations.zone_id', '=', zoneId)
    .select([
      'decorations.id as decoId',
      'decorations.name',
      'decorations.price',
      'decorations.position',
      'decorations.direction',
      'park_decorations.id as parkDecoId',
    ])
    .execute();

  if (barrier.length === 0) {
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
