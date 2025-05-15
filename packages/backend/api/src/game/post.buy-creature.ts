import { type Request, Router } from 'express';
import { Kysely, sql } from 'kysely';

import { db } from '@app/backend-shared';

const postBuyCreature = Router();

postBuyCreature.post('/buyCreature', async (req: Request, res) => {
  const parkId = req.parkId;
  const name = 'toto';
  const creatureId = 6;

  if (parkId === undefined) {
    res.json({
      ok: false,
    });
    return;
  }

  const creature = await db
    .selectFrom('creatures')
    .select(['id', 'price', 'feed_timer'])
    .where('id', '=', creatureId)
    .executeTakeFirst();

  if (!creature) {
    res.json({
      ok: false,
      message: 'no creature find',
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
    .execute();

  if (!updateWallet) {
    res.json({
      message: 'Not enought money',
      ok: false,
    });
    return;
  }

  const addCreature = await db
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
      creature_id: creatureId,
    })
    .executeTakeFirst();

  res.json({
    ok: true,
    message: 'creature add',
  });
});

export default postBuyCreature;
