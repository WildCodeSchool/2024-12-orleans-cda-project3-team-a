import express from 'express';
import type { Request } from 'express';

import { db } from '@app/backend-shared';

const getCreaturesMenuRoute = express.Router();

function getCreaturesMenu(parkId: number) {
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
      'creatures.profit',
      'creatures.src_image',
      'creatures.zone_id',
      'creatures.background',
      'zones.src_sign',
      db.fn.count('park_creatures.creature_id').as('quantityCreature'),
    ])
    .groupBy('creatures.id')
    .execute();
}

getCreaturesMenuRoute.get('/creatures-menu', async (req: Request, res) => {
  const parkId = req.parkId;

  if (parkId === undefined) {
    res.json({
      ok: false,
    });
    return;
  }

  const creaturesMenu = await getCreaturesMenu(parkId);

  if (creaturesMenu.length === 0) {
    res.json({
      ok: false,
      message: 'no creatures found ',
    });
    return;
  }

  res.json({
    ok: true,
    creaturesMenu,
  });
});

export default getCreaturesMenuRoute;
