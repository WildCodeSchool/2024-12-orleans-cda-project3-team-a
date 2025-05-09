import { ok } from 'assert';
import express from 'express';
import type { Request } from 'express';

import { db } from '@app/backend-shared';

const getCreaturesRoute = express.Router();

function creatures(parkId: number) {
  return db
    .selectFrom('creatures')
    .leftJoin('park_creatures', (join) =>
      join
        .onRef('creatures.id', '=', 'park_creatures.creature_id')
        .on('park_creatures.park_id', '=', parkId),
    )
    .leftJoin('zones', 'creatures.zone_id', 'zones.id')
    .select([
      'creatures.id',
      'creatures.species',
      'creatures.feed_timer',
      'creatures.price',
      'creatures.unlock_cost',
      'creatures.src_image',
      'creatures.zone_id',
      'creatures.background',
      'zones.src_sign',
      db.fn.count('park_creatures.creature_id').as('nmbrCreature'),
    ])
    .groupBy('creatures.id')
    .execute();
}

export type Creatures = Awaited<ReturnType<typeof creatures>>;

getCreaturesRoute.get('/creatures', async (req: Request, res) => {
  const parkId = req.parkId;

  if (parkId === undefined) {
    res.json({
      ok: false,
    });
    return;
  }

  const creaturesList = await creatures(parkId);

  if (creaturesList.length === 0) {
    res.json({
      ok: false,
      message: 'no creatures founded ',
    });
    return;
  }

  res.json({
    creaturesList,
  });
});

export default getCreaturesRoute;
