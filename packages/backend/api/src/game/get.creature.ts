import express from 'express';
import type { Request } from 'express';

import { db } from '@app/backend-shared';

const getCreatureRoute = express.Router();

function getCreatures(parkId: number) {
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

export type Creatures = Awaited<ReturnType<typeof getCreatures>>;

getCreatureRoute.get('/info-creatures', async (req: Request, res) => {
  const parkId = req.parkId;

  if (parkId === undefined) {
    res.json({
      ok: false,
    });
    return;
  }

  const creaturesList = await getCreatures(parkId);

  if (!creaturesList) {
    res.json({
      message: 'failed',
    });
    return;
  }

  res.json({
    creaturesList,
  });
});

export default getCreatureRoute;
