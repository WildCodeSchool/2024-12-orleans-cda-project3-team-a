import express from 'express';

import { db } from '@app/backend-shared';

const postAddBarrier = express.Router();

postAddBarrier.post('/add-barrier', async (req, res) => {
  const parkId = 5;
  const directionName = 'direction-mythologic-up-2';

  //check if we have already the barrier in parkId
  const barrier = await db
    .selectFrom('park_decorations')
    .innerJoin('decorations', 'decorations.id', 'park_decorations.deco_id')
    .select(['park_id', 'deco_id', 'name', 'price'])
    // .where('decorations.name', '=', directionName )
    .where((eb) =>
      eb.and([
        eb('park_decorations.park_id', '=', parkId),
        eb('decorations.name', '=', directionName),
      ]),
    )
    .executeTakeFirst();

  //if barrier  already exist do not add
  if (barrier) {
    res.json({
      message: 'direction already in stock',
      barrier,
    });
    return;
  }

  //Find the id of the deco to add it
  const decoId = await db
    .selectFrom('decorations')
    .select(['id', 'price'])
    .where('name', '=', directionName)
    .executeTakeFirst();

  if (!decoId) {
    res.status(404).json({ message: 'Decoration not found' });
    return;
  }

  //insert the decoId in table park_decorations
  await db
    .insertInto('park_decorations')
    .values({
      park_id: parkId,
      deco_id: decoId.id,
    })
    .executeTakeFirst();

  //soustraction price of deco
  await db
    .updateTable('parks')
    .set((eb) => ({
      wallet: eb('wallet', '-', decoId.price),
    }))
    .where('id', '=', parkId)
    .where('wallet', '>=', decoId.price)
    .executeTakeFirst();

  res.json({
    message: 'decoration added',
    barrier,
  });
});

export default postAddBarrier;
