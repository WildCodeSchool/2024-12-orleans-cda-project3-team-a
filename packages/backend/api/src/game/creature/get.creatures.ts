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

function getInactiveCreatureCount(parkId: number, creatureId: number) {
  const dateNow = new Date();
  return db
    .selectFrom('park_creatures')
    .innerJoin('creatures', 'park_creatures.creature_id', 'creatures.id')
    .select(({ fn }) => [fn.countAll().as('total_inactive_creatures')])
    .where('park_creatures.park_id', '=', parkId)
    .where('park_creatures.creature_id', '=', creatureId)
    .where('park_creatures.feed_date', '<', dateNow)
    .execute();
}

export type Creatures = Awaited<ReturnType<typeof getCreatures>>;

export type InactiveCreatureCount = Awaited<
  ReturnType<typeof getInactiveCreatureCount>
>;

getCreaturesRoute.get('/', async (req: Request, res) => {
  const parkId = req.parkId;
  const creatureId = req.query.creature_id;

  if (parkId === undefined) {
    res.json({
      ok: false,
    });
    return;
  }

  if (typeof creatureId !== 'string') {
    res.json({
      ok: false,
      message: 'creatureId missing',
    });
    return;
  }

  const [creatures, inactiveCreatures] = await Promise.all([
    getCreatures(parkId, parseInt(creatureId)),
    getInactiveCreatureCount(parkId, parseInt(creatureId)),
  ]);

  const potionPrice = await db
    .selectFrom('potions')
    .leftJoin('creatures', 'potions.zone_id', 'creatures.zone_id')
    .select('potions.price')
    .where('creatures.id', '=', Number(creatureId))
    .executeTakeFirst();

  res.json({
    parkId,
    creatures,
    inactiveCreatures,
    potionPrice,
  });
});

export default getCreaturesRoute;
