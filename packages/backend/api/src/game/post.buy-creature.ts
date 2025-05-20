import { type Request, Router } from 'express';
import { sql } from 'kysely';

import { db } from '@app/backend-shared';

const postBuyCreature = Router();

postBuyCreature.post('/buy-creature', async (req: Request, res) => {
  const parkId = req.parkId;
  const creatureId = req.query.creatureId;

  // const parkId=30;

  const name = req.body.name;
  const zoneId = req.body.zoneId;

  if (parkId === undefined) {
    res.json({
      ok: false,
    });
    return;
  }

  if (name === undefined) {
    res.json({
      ok: false,
      message: 'name is undefined to buy creature',
    });
    return;
  }

  if (typeof creatureId !== 'string') {
    res.json({
      ok: false,
      message: 'creatureId is not a string',
      creatureId,
    });
    return;
  }

  const creature = await db
    .selectFrom('creatures')
    .select(['id', 'price', 'feed_timer'])
    .where('id', '=', parseInt(creatureId))
    .where('zone_id', '=', zoneId)
    .executeTakeFirst();

  if (!creature) {
    res.json({
      ok: false,
      message: 'no creature find in the zone chosen',
      creatureId,
      zoneId,
    });
    return;
  }

  const updateWallet = await db
    .updateTable('parks')
    .set((eb) => ({
      wallet: eb('wallet', '-', creature.price),
    }))
    .where('id', '=', parkId)
    .where('wallet', '>=', creature.price)
    .executeTakeFirst();

  if (updateWallet.numUpdatedRows === 0n) {
    res.json({
      message: 'Not enought money',
      ok: false,
    });
    return;
  }

  await db
    .insertInto('park_creatures')
    .values({
      name,
      gender: 'male',
      is_adult: 1,
      is_parent: 0,
      is_active: 1,
      feed_date: sql`NOW() + INTERVAL ${creature.feed_timer} MINUTE`,
      adult_at: sql`NOW() + INTERVAL 2 DAY`,
      park_id: parkId,
      creature_id: parseInt(creatureId),
    })
    .executeTakeFirst();

  res.json({
    ok: true,
    message: 'creature add',
  });
});
export default postBuyCreature;
