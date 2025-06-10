import { type Request, Router } from 'express';
import { sql } from 'kysely';

import { db } from '@app/backend-shared';

const postFeedAll = Router();

postFeedAll.post('/feed', async (req: Request, res) => {
  const parkId = req.parkId;
  const { parkCreatureId, zoneId } = req.body;

  if (parkId === undefined) {
    res.json({
      ok: false,
    });
    return;
  }

  const wallet = await db
    .selectFrom('parks')
    .select('wallet')
    .where('parks.id', '=', parkId)
    .executeTakeFirst();

  const potionPrice = await db
    .selectFrom('potions')
    .select('price')
    .where('potions.zone_id', '=', zoneId)
    .executeTakeFirst();

  if (!wallet || typeof wallet !== 'number') {
    res.json({
      ok: false,
      message: 'Wallet is empty',
    });
    return;
  }

  if (!potionPrice || typeof potionPrice !== 'number') {
    res.json({
      ok: false,
      message: 'Potion price is null',
    });
    return;
  }

  const countCreatureToUpdate = Math.floor(wallet / potionPrice);

  // Check if the creature is active
  const inactiveCreatures = await db
    .selectFrom('park_creatures')
    .innerJoin('creatures', 'creatures.id', 'park_creatures.creature_id')
    .select([
      'park_creatures.id',
      'creatures.feed_timer',
      'creatures.id as creatureId',
    ])
    .where('park_creatures.creature_id', '=', parkCreatureId)
    .where('creatures.zone_id', '=', zoneId)
    .where('park_creatures.feed_date', '<', new Date())
    .limit(countCreatureToUpdate)
    .execute();

  if (inactiveCreatures.length === 0) {
    res.json({
      ok: false,
      message: 'no inactive creature',
      parkCreatureId,
    });
    return;
  }

  const idsCreaturesToFeed = inactiveCreatures.map((creature) => creature.id);
  const feedTimerCreature = inactiveCreatures[0].feed_timer;

  // if (inactiveCreatures.feed_timer !== null) {
  //   res.json({
  //     ok: false,
  //     message: 'format is not compatible',
  //     crature: inactiveCreatures.feed_timer,
  //   });
  //   return;
  // }

  //request for soustraction price of potion
  const updateWallet = await db
    .updateTable('parks')
    .set((eb) => ({
      wallet: eb('wallet', '-', potionPrice * countCreatureToUpdate),
    }))
    .where('id', '=', parkId)
    .where('wallet', '>=', potionPrice * countCreatureToUpdate)
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
      feed_date: sql`NOW() + INTERVAL ${feedTimerCreature} MINUTE`,
    })
    .where('creature_id', '=', parkCreatureId)
    .where('park_creatures.id', 'in', idsCreaturesToFeed)
    .executeTakeFirst();

  res.json({
    ok: true,
    message: 'feed_date updated',
    inactiveCreatures,
    potionPrice,

    parkCreatureId,
    zoneId,
  });
});

export default postFeedAll;
