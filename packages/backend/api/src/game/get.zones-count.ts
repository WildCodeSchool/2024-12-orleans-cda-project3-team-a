import express from 'express';

import { db } from '@app/backend-shared';

const getZonesCount = express.Router();

function getZones(parkId: number) {
  return db
    .selectFrom('zones')
    .leftJoin('park_zones', (join) =>
      join
        .onRef('zones.id', '=', 'park_zones.zone_id')
        .on('park_id', '=', parkId),
    )
    .select([
      'zones.id as zone_id',
      'zones.name',
      'zones.unlock_cost',
      'zones.src_image',
      'zones.link',
      'park_zones.id as park_zone_id',
    ])
    .execute();
}

export type UnlockedZones = Awaited<ReturnType<typeof getZones>>;

getZonesCount.get('/zones-count', async (_req, res) => {
  //PLUS TARD récupérer l'id dans le cookie !
  const userId = 8;

  const park = await db
    .selectFrom('parks')
    .selectAll()
    .where('parks.user_id', '=', userId)
    .executeTakeFirst();

  if (!park) {
    res.json({
      message: 'no user corresponding',
    });
    return;
  }

  const unlockedZonesResult = await getZones(park.id);

  res.json({
    parkId: park.id,
    unlockedZonesResult,
  });
});

export default getZonesCount;
