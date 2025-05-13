import express from 'express';
import type { Request } from 'express';

import { db } from '@app/backend-shared';

const getEnclosRoute = express.Router();

function enclos(parkId: number) {
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

export type Enclos = Awaited<ReturnType<typeof enclos>>;

getEnclosRoute.get('/creatures', async (req: Request, res) => {
  const parkId = req.parkId;

  if (parkId === undefined) {
    res.json({
      ok: false,
    });
    return;
  }

  const creaturesList = await enclos(parkId);

  if (creaturesList.length === 0) {
    res.json({
      ok: false,
      message: 'no creatures found ',
    });
    return;
  }

  res.json({
    creaturesList,
  });
});

export default getEnclosRoute;
