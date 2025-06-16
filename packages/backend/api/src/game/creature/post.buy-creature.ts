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

// check how many of each creature have been bought in this zone
function getCreaturesForUnlock(
  zoneId: number,
  parkId: number,
  forUnlock: number,
) {
  return db
    .selectFrom('creatures as c')
    .leftJoin('park_creatures as pc', (join) =>
      join.onRef('pc.creature_id', '=', 'c.id').on('pc.park_id', '=', parkId),
    )
    .select(['c.id', sql<number>`COUNT(pc.creature_id)`.as('count')])
    .where('c.zone_id', '=', zoneId)
    .groupBy('c.id')
    .having(sql<number>`COUNT(pc.creature_id)`, '<', forUnlock)
    .execute();
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

  const zonesUnlocked = await db
    .selectFrom('park_zones')
    .innerJoin('visitors', 'visitors.zone_id', 'park_zones.zone_id')
    .select(['park_zones.zone_id', 'visitors.id as visitor_id'])
    .where('park_zones.park_id', '=', parkId)
    .execute();

  // function to use to generate a visitor id random
  function getRandomVisitor(): number {
    const randomIndex = Math.floor(Math.random() * zonesUnlocked.length);
    return zonesUnlocked[randomIndex].visitor_id;
  }

  //insert into park_visitor the new visitor
  await db
    .insertInto('park_visitors')
    .values({
      entry_time: sql`NOW()`,
      exit_time: sql`NOW() + INTERVAL 4 HOUR`,
      park_id: parkId,
      visitor_id: getRandomVisitor(),
    })
    .executeTakeFirst();

  const [isNextZoneUnlocked] = await Promise.all([
    getTotalCreaturesByZone(zoneId),
    getCreaturesUnlockedByZone(zoneId, parkId),
    getIsNextZoneUnlocked(parkId, zoneId),
  ]);

  const zone = await db
    .selectFrom('zones')
    .select(['name'])
    .where('id', '=', zoneId)
    .executeTakeFirst();

  const countUnlock: Record<string, number> = {
    fairy: 15,
    winged: 10,
    mythologic: 5,
  };

  //if we have unlocked all creature in the zone, we add the next zone if is not already the case
  //don't do this if we are in the last zone
  const forUnlock = countUnlock[zone?.name ?? ''] ?? 0;

  if (forUnlock > 0) {
    const creaturesUnlock = await getCreaturesForUnlock(
      zoneId,
      parkId,
      forUnlock,
    );

    if (creaturesUnlock.length === 0) {
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
    message: 'creature and visitor added',
  });
});

export default postBuyCreature;
