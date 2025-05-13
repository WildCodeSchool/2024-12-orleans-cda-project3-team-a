import { type Request, Router } from 'express';

import { db } from '@app/backend-shared';

const getCreatureRoute = Router();

function getCreature(parkId: number, creatureId: number) {
  return db
    .selectFrom('park_creatures')
    .innerJoin('creatures', 'park_creatures.creature_id', 'creatures.id')
    .selectAll()
    .where('park_creatures.park_id', '=', parkId)
    .where('park_creatures.creature_id', '=', creatureId)
    .execute();
}

export type GetCreature = Awaited<ReturnType<typeof getCreature>>;

getCreatureRoute.get('/creature', async (req: Request, res) => {
  const parkId = req.parkId;

  if (parkId === undefined) {
    res.json({
      ok: false,
    });
    return;
  }

  const creatureId = 6;

  const creature = await getCreature(parkId, creatureId);

  res.json({
    parkId,
    creature,
  });
});

export default getCreatureRoute;
