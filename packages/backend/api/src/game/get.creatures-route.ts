import { type Request, Router } from 'express';

import { db } from '@app/backend-shared';

const getCreaturesRoute = Router();

function getCreatures(parkId: number, creatureId: number) {
  return db
    .selectFrom('park_creatures')
    .innerJoin('creatures', 'park_creatures.creature_id', 'creatures.id')
    .selectAll('park_creatures')
    .select([
      'creatures.id as creatureId',
      'creatures.species',
      'creatures.feed_timer',
      'creatures.price',
      'creatures.src_image',
      'creatures.zone_id',
    ])
    .where('park_creatures.park_id', '=', parkId)
    .where('park_creatures.creature_id', '=', creatureId)
    .groupBy('park_creatures.id')
    .execute();
}

function getActiveCreatureCount(parkId: number, creatureId: number) {
  return db
    .selectFrom('park_creatures')
    .innerJoin('creatures', 'park_creatures.creature_id', 'creatures.id')
    .select(({ fn }) => [fn.countAll().as('total_active_creatures')])
    .where('park_creatures.park_id', '=', parkId)
    .where('park_creatures.creature_id', '=', creatureId)
    .where('park_creatures.is_active', '=', 1)
    .execute();
}

export type GetCreatures = Awaited<ReturnType<typeof getCreatures>>;

export type GetActiveCreatureCount = Awaited<
  ReturnType<typeof getActiveCreatureCount>
>;

getCreaturesRoute.get('/creatures', async (req: Request, res) => {
  const parkId = req.parkId;

  if (parkId === undefined) {
    res.json({
      ok: false,
    });
    return;
  }

  const creatureId = 6;

  const creatures = await getCreatures(parkId, creatureId);

  const activeCreatures = await getActiveCreatureCount(parkId, creatureId);

  res.json({
    parkId,
    creatures,
    activeCreatures,
  });
});

export default getCreaturesRoute;
