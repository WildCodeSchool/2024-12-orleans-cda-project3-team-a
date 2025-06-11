import { type Request, Router } from 'express';
import { sql } from 'kysely';

import { db } from '@app/backend-shared';

const postFeedCreature = Router();

postFeedCreature.post('/feed', async (req: Request, res) => {
  const parkId = req.parkId;
  const { parkCreatureId, zoneId } = req.body;

  if (parkId === undefined) {
    res.json({
      ok: false,
    });
    return;
  }

  // Check if the creature is active
  const creature = await db
    .selectFrom('park_creatures')
    .innerJoin('creatures', 'creatures.id', 'park_creatures.creature_id')
    .select(['park_creatures.feed_date', 'creatures.feed_timer'])
    .where('park_creatures.id', '=', parkCreatureId)
    .executeTakeFirst();

  if (!creature) {
    res.json({
      ok: false,
      message: 'active creature is null',
    });
    return;
  }

  if (creature.feed_timer === null) {
    res.json({
      ok: false,
      message: 'format is not compatible',
    });
    return;
  }

  // get potion price
  const potionPrice = await db
    .selectFrom('potions')
    .select('price')
    .where('zone_id', '=', zoneId)
    .executeTakeFirst();

  if (!potionPrice) {
    res.json({
      ok: false,
      message: 'Potion price is null',
    });
    return;
  }

  //request for soustraction price of potion
  const updateWallet = await db
    .updateTable('parks')
    .set((eb) => ({
      wallet: eb('wallet', '-', potionPrice.price),
    }))
    .where('id', '=', parkId)
    .where('wallet', '>=', potionPrice.price)
    .executeTakeFirst();

  //if not enough money, update row = 0, no time will be added to feed_date
  if (updateWallet.numUpdatedRows === 0n) {
    res.json({
      ok: false,
      message: 'Not enough money',
    });
    return;
  }

  //update feed_date
  await db
    .updateTable('park_creatures')
    .set({
      feed_date: sql`NOW() + INTERVAL ${creature.feed_timer} MINUTE`,
    })
    .where('id', '=', parkCreatureId)
    .executeTakeFirst();

  res.json({
    ok: true,
    message: 'feed_date updated',
  });
});

export default postFeedCreature;
