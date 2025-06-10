import { type Request, Router } from 'express';
import { sql } from 'kysely';

import { db } from '@app/backend-shared';

const postFeedAll = Router();

postFeedAll.post('/feed-all', async (req: Request, res) => {
  const parkId = req.parkId;
  const { creatureId, zoneId } = req.body;

  if (parkId === undefined) {
    res.json({
      ok: false,
    });
    return;
  }

  const park = await db
    .selectFrom('parks')
    .select('wallet')
    .where('parks.id', '=', parkId)
    .executeTakeFirst();

  const potion = await db
    .selectFrom('potions')
    .select('price')
    .where('potions.zone_id', '=', zoneId)
    .executeTakeFirst();

  if (!park || typeof park.wallet !== 'number') {
    res.json({
      ok: false,
      message: 'Wallet is empty',
    });
    return;
  }

  if (!potion || typeof potion.price !== 'number') {
    res.json({
      ok: false,
      message: 'Potion price is null',
    });
    return;
  }

  const potionPrice = potion.price;

  const countCreatureToUpdate = Math.floor(park.wallet / potionPrice);

  // Check if the creature is active
  const inactiveCreatures = await db
    .selectFrom('park_creatures')
    .innerJoin('creatures', 'creatures.id', 'park_creatures.creature_id')
    .select([
      'park_creatures.id',
      'creatures.feed_timer',
      'creatures.id as creatureId',
    ])
    .where('park_creatures.creature_id', '=', creatureId)
    .where('creatures.zone_id', '=', zoneId)
    .where('park_creatures.feed_date', '<', new Date())
    .limit(countCreatureToUpdate)
    .execute();

  if (inactiveCreatures.length === 0) {
    res.json({
      ok: false,
      message: 'no inactive creature',
      creatureId,
    });
    return;
  }

  const countUpdatedCreatures = inactiveCreatures.length;

  const idsCreaturesToFeed = inactiveCreatures.map((creature) => creature.id);
  const feedTimerCreature = inactiveCreatures[0].feed_timer;

  //update feed_date
  await db
    .updateTable('park_creatures')
    .set({
      feed_date: sql`NOW() + INTERVAL ${feedTimerCreature} MINUTE`,
    })
    .where('creature_id', '=', creatureId)
    .where('park_creatures.id', 'in', idsCreaturesToFeed)
    .executeTakeFirst();

  //request for soustraction price of potion
  const updateWallet = await db
    .updateTable('parks')
    .set((eb) => ({
      wallet: eb('wallet', '-', potionPrice * countUpdatedCreatures),
    }))
    .where('id', '=', parkId)
    .where('wallet', '>=', potionPrice * countUpdatedCreatures)
    .executeTakeFirst();

  //if not enough money, update row = 0, no time will be added to feed_date
  if (updateWallet.numUpdatedRows === 0n) {
    res.json({
      ok: false,
      message: 'Not enough money',
    });
    return;
  }

  res.json({
    ok: true,
    message: 'feed_date updated',
    inactiveCreatures,
    potion,
    countUpdatedCreatures,
    potionPrice,
    countCreatureToUpdate,
  });
});

export default postFeedAll;
