import express from 'express';

import { db } from '@app/backend-shared';

const getCreatureRoute = express.Router();

function getCreature(parkId: number, creatureId : number) {
  return db
    .selectFrom('park_creatures')
    .innerJoin('creatures', 'park_creatures.creature_id', 'creatures.id')
    .selectAll()
    .where('park_creatures.park_id', '=', parkId)
    .where('park_creatures.creature_id', '=', creatureId)
    .execute();
}

export type GetCreature = Awaited<ReturnType<typeof getCreature>>;

getCreatureRoute.get('/creature', async (_req, res) => {
  //PLUS TARD récupérer l'id dans le cookie !
  const parkId = 1;
  const creatureId = 6;

  const creature = await getCreature(parkId, creatureId);

  res.json({
    parkId,
    creature,
  });
});

export default getCreatureRoute;
