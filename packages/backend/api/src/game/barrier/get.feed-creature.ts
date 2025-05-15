//Request to add the barrier in his park and deduct money in his wallet
import { type Request, Router } from 'express';

import { db } from '@app/backend-shared';

const postFeedCreature = Router();

postFeedCreature.post('/', async (req: Request, res) => {
  const parkId = req.parkId;
  const { creatureId, zoneId, feed_timer } = req.body;
  // const zoneId = req.body.zoneId;

  if (parkId === undefined) {
    res.json({
      ok: false,
    });
    return;
  }

  // Check if the creature is active
  const activeCreature = await db
    .selectFrom('park_creatures')
    .where('id', '=', creatureId)
    .select('is_active')
    .executeTakeFirst();

  if (!activeCreature) {
    res.json({
      ok: false,
    });
    return;
  }

  const isHungry = activeCreature?.is_active === 0;

  // get potion price
  const potionPrice = await db
    .selectFrom('potions')
    .where('zone_id', '=', zoneId)
    .select('price')
    .executeTakeFirst();

    if (!potionPrice) {
    res.json({
      ok: false,
    });
    return;
  }

  //Add 3Hours to feed_date
  const newFeedDate = new Date();
  newFeedDate.setHours(newFeedDate.getHours() + 3);

  //request for soustraction price of deco
  const updateWallet = await db
    .updateTable('parks')
    .set((eb) => ({
      wallet: eb('wallet', '-', potionPrice),
    }))
    .where('id', '=', parkId)
    .where('wallet', '>=', potionPrice)
    .executeTakeFirst();

  //if not enough money, update row = 0 so return to not add barrier in bdd
  if (updateWallet.numUpdatedRows === 0n) {
    res.json({
      message: 'Not enough money',
      ok: false,
    });
    return;
  }

  //update feed_date et is_active
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
