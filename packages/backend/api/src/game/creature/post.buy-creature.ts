import { type Request, Router } from 'express';
import { sql } from 'kysely';

import { db } from '@app/backend-shared';

import parkRouter from '../park';

const postBuyCreature = Router();

postBuyCreature.post('/buy', async (req: Request, res) => {
  const parkId = req.parkId;
  const name = req.body.name;
  const creatureId = req.query.creatureId;

  const zoneId = req.body.zoneId;

  const gender = Math.random() < 0.5 ? 'male' : 'female';

  if (parkId === undefined) {
    res.json({
      ok: false,
    });
    return;
  }

  if (name === undefined) {
    res.json({
      ok: false,
    });
    return;
  }

  if (typeof creatureId !== 'string') {
    res.json({
      ok: false,
      message: 'creatureId missing',
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
      gender,
      is_adult: 1,
      is_parent: 0,
      feed_date: sql`NOW() + INTERVAL ${creature.feed_timer} MINUTE`,
      adult_at: sql`NOW() + INTERVAL 2 DAY`,
      park_id: parkId,
      creature_id: parseInt(creatureId),
    })
    .executeTakeFirst();

  // check how many creatures we can unlock in this zone
  const totalCreaturesByZone = await db
    .selectFrom('creatures')
    .select([db.fn.count('creatures.id').as('quantityCreature')])
    .where('creatures.zone_id', '=', zoneId)
    .executeTakeFirst();

  //check how many creatures user has unlocked in this zone
  const creaturesUnlockedByZone = await db
    .selectFrom('park_creatures')
    .leftJoin('creatures', 'park_creatures.creature_id', 'creatures.id')
    .select([
      sql<number>`COUNT(DISTINCT ${sql.ref('park_creatures.creature_id')})`.as(
        'countCreaturesUnlockedByZone',
      ),
    ])
    .where('creatures.zone_id', '=', zoneId)
    .where('park_creatures.park_id', '=', parkId)
    .executeTakeFirst();

  //Check if we have already the next zone
  const isNextZoneUnlocked = await db
    .selectFrom('park_zones')
    .select('park_zones.id')
    .where('park_id', '=', parkId)
    .where('park_zones.zone_id', '=', Number(zoneId) + 1)
    .executeTakeFirst();

  //if we have unlocked all creature in the zone, we add the next zone if is not already the case
  if (Number(zoneId) === 4) {
    return;

    if (
      creaturesUnlockedByZone?.countCreaturesUnlockedByZone ===
      totalCreaturesByZone?.quantityCreature
    ) {
      if (!isNextZoneUnlocked) {
        await db
          .insertInto('park_zones')
          .values({
            park_id: parkId,
            zone_id: Number(zoneId) + 1,
          })
          .executeTakeFirst();
      }
    }
  }

  res.json({
    ok: true,
    message: 'creature add',
  });
});
export default postBuyCreature;
