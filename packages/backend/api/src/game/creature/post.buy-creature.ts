import { type Request, Router } from 'express';
import { sql } from 'kysely';

import { db } from '@app/backend-shared';

const postBuyCreature = Router();

// check how many creatures we can unlock in this zone
function getTotalCreaturesByZone(zoneId: number) {
  return db
    .selectFrom('creatures')
    .select([db.fn.count('creatures.id').as('quantityCreature')])
    .where('creatures.zone_id', '=', zoneId)
    .executeTakeFirst();
}

//check how many creatures user has unlocked in this zone
function getCreaturesUnlockedByZone(zoneId: number, parkId: number) {
  return db
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
}

//Check if we have already the next zone in bdd
function getIsNextZoneUnlocked(parkId: number, zoneId: number) {
  return db
    .selectFrom('park_zones')
    .select('park_zones.id')
    .where('park_id', '=', parkId)
    .where('park_zones.zone_id', '=', Number(zoneId) + 1)
    .executeTakeFirst();
}

//count the number of zone we can unlock
function getMaxZone() {
  return db
    .selectFrom('zones')
    .select([db.fn.count('zones.id').as('countZone')])
    .executeTakeFirst();
}

postBuyCreature.post('/buy', async (req: Request, res) => {
  const parkId = req.parkId;

  const creatureId = req.query.creatureId;

  const zoneId = req.body.zoneId;
  const name = req.body.name;

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

  //insert into park_creature the new creature
  await db
    .insertInto('park_creatures')
    .values({
      name,
      gender,
      is_adult: 1,
      is_parent: 0,
      feed_date: sql`NOW() + INTERVAL ${creature.feed_timer} MINUTE`,
      adult_at: sql`NOW()`,
      park_id: parkId,
      creature_id: parseInt(creatureId),
    })
    .executeTakeFirst();

  //insert into park_visitor the new visitor
  await db
    .insertInto('park_visitors')
    .values({
      entry_time: sql`NOW()`,
      exit_time: sql`NOW() + INTERVAL 4 HOUR`,
      park_id: parkId,
      visitor_id: zoneId,
    })
    .executeTakeFirst();

  const [
    totalCreaturesByZone,
    creaturesUnlockedByZone,
    isNextZoneUnlocked,
    maxZone,
  ] = await Promise.all([
    getTotalCreaturesByZone(zoneId),
    getCreaturesUnlockedByZone(zoneId, parkId),
    getIsNextZoneUnlocked(parkId, zoneId),
    getMaxZone(),
  ]);

  //if we have unlocked all creature in the zone, we add the next zone if is not already the case
  //don't do this if we are in the last zone
  if (Number(zoneId) !== Number(maxZone?.countZone)) {
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
    message: 'creature add and visitor',
  });
});
export default postBuyCreature;
