//Request to add the barrier in his park and deduct money in his wallet
import { type Request, Router } from 'express';

import { db } from '@app/backend-shared';

const postBarrier = Router();

postBarrier.post('/', async (req: Request, res) => {
  const parkId = req.parkId;
  const barrierId = req.body.barrierId;

  if (parkId === undefined) {
    res.json({
      ok: false,
    });
    return;
  }

  //check if we have already the barrier in parkId
  const barrier = await db
    .selectFrom('barriers')
    .leftJoin('park_barriers', (join) =>
      join
        .onRef('barriers.id', '=', 'park_barriers.barrier_id')
        .on('park_barriers.park_id', '=', parkId),
    )
    .where('barriers.id', '=', barrierId)
    .select([
      'barriers.id as barrierId',
      'barriers.price',
      'park_barriers.id as parkBarrierId',
    ])
    .executeTakeFirst();

  //check if barrier exist
  if (!barrier) {
    res.json({
      ok: false,
      message: 'barrier not found',
    });
    return;
  }

  //if barrier already exist do not add
  if (barrier.parkBarrierId !== null) {
    res.json({
      ok: false,
      message: 'direction already in stock',
    });
    return;
  }

  //request for soustraction price of deco
  const updateWallet = await db
    .updateTable('parks')
    .set((eb) => ({
      wallet: eb('wallet', '-', barrier.price),
    }))
    .where('id', '=', parkId)
    .where('wallet', '>=', barrier.price)
    .executeTakeFirst();

  //if not enough money, update row = 0 so return to not add barrier in bdd
  if (updateWallet.numUpdatedRows === 0n) {
    res.json({
      ok: false,
      message: 'Not enough money',
    });
    return;
  }

  //insert the barrierId in table park_barriers
  await db
    .insertInto('park_barriers')
    .values({
      park_id: parkId,
      barrier_id: barrier.barrierId,
    })
    .executeTakeFirst();

  res.json({
    ok: true,
    message: 'barrier added',
  });
});

export default postBarrier;
