//Request to know if the user has the barrier or not in his park
import express from 'express';

import { db } from '@app/backend-shared';

const getBarrier = express.Router();

function barrier(parkId: number, zoneId: number) {
  return db
    .selectFrom('decorations')
    .leftJoin('park_decorations', (join) =>
      join
        .onRef('decorations.id', '=', 'park_decorations.deco_id')
        .on('park_decorations.park_id', '=', parkId),
    )
    .where('decorations.zone_id', '=', zoneId)
    .select([
      'decorations.id as decoId',
      'decorations.price',
      'decorations.position',
      'decorations.direction',
      'park_decorations.id as parkDecoId',
    ])
    .execute();
}

export type BarrierType = Awaited<ReturnType<typeof barrier>>[number];

getBarrier.get('/barrier', async (_req, res) => {
  const parkId = 5;
  const zoneId = 4;

  const barrierResult = await barrier(parkId, zoneId);

  if (barrierResult.length === 0) {
    res.json({
      ok: false,
    });
    return;
  }

  res.json({
    barrierResult,
  });
});

export default getBarrier;
