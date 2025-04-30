//Request to know if the user has the barrier or not in his park
import express from 'express';

import { db } from '@app/backend-shared';

const getBarriersRoute = express.Router();

function getBarriers(parkId: number, zoneId: number) {
  return db
    .selectFrom('barriers')
    .leftJoin('park_barriers', (join) =>
      join
        .onRef('barriers.id', '=', 'park_barriers.barrier_id')
        .on('park_barriers.park_id', '=', parkId),
    )
    .where('barriers.zone_id', '=', zoneId)
    .select([
      'barriers.id as barrierId',
      'barriers.price',
      'barriers.position',
      'barriers.direction',
      'park_barriers.id as parkBarrierId',
    ])
    .execute();
}

export type Barrier = Awaited<ReturnType<typeof getBarriers>>[number];

getBarriersRoute.get('/', async (req, res) => {
  const parkId = 5;
  const zoneId = req.query.zoneId;

  //check type of zoneId
  if (typeof zoneId !== 'string') {
    res.json({
      ok: false,
    });
    return;
  }

  const barriers = await getBarriers(parkId, parseInt(zoneId));

  if (barriers.length === 0) {
    res.json({
      message: 'no barriers loading',
      ok: false,
    });
    return;
  }

  res.json({
    ok: true,
    barriers,
  });
});

export default getBarriersRoute;
