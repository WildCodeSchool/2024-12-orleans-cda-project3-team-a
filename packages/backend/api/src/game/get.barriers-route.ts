//Request to know if the user has the barrier or not in his park
import express from 'express';

import { db } from '@app/backend-shared';

const getBarriersRoute = express.Router();

function getBarriers(parkId: number, zoneId: number) {
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

export type Barrier = Awaited<ReturnType<typeof getBarriers>>[number];

getBarriersRoute.get('/barriers', async (_req, res) => {
  const parkId = 8;
  const zoneId = 2;

  const barriers = await getBarriers(parkId, zoneId);

  if (barriers.length === 0) {
    res.json({
      ok: false,
    });
    return;
  }

  res.json({
    barriers,
  });
});

export default getBarriersRoute;
