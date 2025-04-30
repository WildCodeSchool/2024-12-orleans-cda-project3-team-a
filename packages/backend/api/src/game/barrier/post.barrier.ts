//Request to add the barrier in his park and deduct mooney in his wallet
import express from 'express';

import { db } from '@app/backend-shared';

const postBarrier = express.Router();

postBarrier.post('/', async (req, res) => {
  const parkId = 1;
  const barrierId = req.body.barrierId;

  //check if we have already the barrier in parkId
  const barrier = await db
    .selectFrom('park_barriers')
    .innerJoin('barriers', 'barriers.id', 'park_barriers.barrier_id')
    .select(['barriers.id as barrierId', 'park_id', 'barrier_id', 'price'])
    .where((eb) =>
      eb.and([
        eb('park_barriers.park_id', '=', parkId),
        eb('park_barriers.id', '=', barrierId),
      ]),
    )
    .executeTakeFirst();

  //if barrier  already exist do not add
  if (barrier) {
    res.json({
      ok: false,
      message: 'direction already in stock',
      barrier,
    });
    return;
  }

  //soustraction price of deco
  const updateWallet = await db
    .updateTable('parks')
    .set((eb) => ({
      wallet: eb('wallet', '-', barrierId.price),
    }))
    .where('id', '=', parkId)
    .where('wallet', '>=', barrierId.price)
    .executeTakeFirst();

  //if not enough mooney, update row = 0 so return to not add barrier in bdd
  if (updateWallet.numUpdatedRows === 0n) {
    res.json({
      message: 'Not enough mooney',
      ok: false,
    });
    return;
  }

  //insert the barrierId in table park_barriers
  await db
    .insertInto('park_barriers')
    .values({
      park_id: parkId,
      barrier_id: barrierId,
    })
    .executeTakeFirst();

  res.json({
    ok: true,
  });
});

export default postBarrier;
