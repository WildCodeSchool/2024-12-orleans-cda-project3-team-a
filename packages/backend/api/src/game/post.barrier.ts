//Request to add the barrier in his park and deduct mooney in his wallet
import express from 'express';

import { db } from '@app/backend-shared';

const postBarrier = express.Router();

postBarrier.post('/barrier', async (req, res) => {
  const parkId = 8;
  const decoId = req.body.decoId;

  //check if we have already the barrier in parkId
  const barrier = await db
    .selectFrom('park_decorations')
    .innerJoin('decorations', 'decorations.id', 'park_decorations.deco_id')
    .select(['decorations.id as decoId', 'park_id', 'deco_id', 'price'])
    .where((eb) =>
      eb.and([
        eb('park_decorations.park_id', '=', parkId),
        eb('park_decorations.id', '=', decoId),
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

  //insert the decoId in table park_decorations
  await db
    .insertInto('park_decorations')
    .values({
      park_id: parkId,
      deco_id: decoId,
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
    ok: true,
  });
});

export default postBarrier;
