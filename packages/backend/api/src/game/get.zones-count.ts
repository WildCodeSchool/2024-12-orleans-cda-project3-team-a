import { type Request, Router } from 'express';

import { db } from '@app/backend-shared';

const getZonesCount = Router();

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
      'zones.src_image',
      'zones.link',
      'park_zones.id as park_zone_id',
    ])
    .execute();
}

export type UnlockedZones = Awaited<ReturnType<typeof getZones>>;

getZonesCount.get('/zones-count', async (req: Request, res) => {
  const userId = req.userId;
  const parkId = req.parkId;

  if (parkId === undefined) {
    res.json({
      ok: false,
    });
    return;
  }

  if (userId === undefined) {
    res.json({
      ok: false,
    });
    return;
  }

  const unlockedZonesResult = await getZones(parkId);

  res.json({
    unlockedZonesResult,
  });
});

export default getZonesCount;
