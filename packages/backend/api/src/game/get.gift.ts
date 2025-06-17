import { type Request, Router } from 'express';
import { sql } from 'kysely';

import { db } from '@app/backend-shared';
import { generateName } from '@app/shared';

const getGiftRoute = Router();

//check if last received gift more than 24h
function getLastGift(parkId: number) {
  return db
    .selectFrom('park_gifts')
    .select(['gift_date'])
    .where('park_id', '=', parkId)
    .where('gift_date', '>', sql<Date>`NOW() - INTERVAL 24 HOUR`)
    .execute();
}

//function insert into parks_gift
async function insertGift(parkId: number, type: string, value: string) {
  await db
    .insertInto('park_gifts')
    .values({
      type,
      gift_date: sql`NOW()`,
      value,
      park_id: parkId,
    })
    .executeTakeFirst();
}

//function updateWllet
async function updateWallet(parkId: number, amount: number) {
  await db
    .updateTable('parks')
    .set((eb) => ({
      wallet: eb('wallet', '+', amount),
    }))
    .where('id', '=', parkId)
    .executeTakeFirst();
}

type Creature = {
  id: number;
  feed_timer: number | null;
  src_image: string | null;
  species: string;
};

//function insert creature into park_creatures
async function insertCreatureToPark(parkId: number, creature: Creature) {
  const name = generateName();
  const gender = Math.random() < 0.5 ? 'male' : 'female';

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
      creature_id: creature.id,
    })
    .executeTakeFirst();
}

type Visitor = {
  id: number;
  category: string;
  src_image: string | null;
};

//function insert visitor into park_visitors
async function insertVisitorToPark(parkId: number, visitor: Visitor) {
  await db
    .insertInto('park_visitors')
    .values({
      entry_time: sql`NOW()`,
      exit_time: sql`NOW() + INTERVAL 4 HOUR`,
      park_id: parkId,
      visitor_id: visitor.id,
    })
    .executeTakeFirst();
}

getGiftRoute.get('/gift', async (req: Request, res) => {
  const parkId = req.parkId;
  if (parkId === undefined) {
    res.json({
      ok: false,
    });
    return;
  }

  const lastGift = await getLastGift(parkId);

  //if last gift less than 24H
  if (lastGift.length > 0) {
    res.json({
      ok: false,
      message: 'Too soon for a new gift.',
    });
    return;
  }

  const gifts = ['creature', 'visitor', 'moons'];
  const giftType = gifts[Math.floor(Math.random() * gifts.length)];

  //if creature is drawn
  if (giftType === 'creature') {
    //check unlocked creatures
    const creatures = await db
      .selectFrom('park_creatures')
      .innerJoin('creatures', 'creatures.id', 'park_creatures.creature_id')
      .select([
        'creatures.id',
        'creatures.feed_timer',
        'creatures.src_image',
        'creatures.species',
      ])
      .where('park_id', '=', parkId)
      .distinct()
      .execute();

    //if no creature unlocked yet insert a default creature
    if (creatures.length === 0) {
      const defaultCreature = await db
        .selectFrom('creatures')
        .select(['id', 'species', 'feed_timer', 'src_image'])
        .where('id', '=', 1)
        .executeTakeFirst();

      if (defaultCreature === undefined) {
        res.json({
          ok: false,
          message: 'no creature available',
        });
        return;
      }

      await insertGift(parkId, 'creature', defaultCreature.species);
      await insertCreatureToPark(parkId, defaultCreature);
    }

    //else draw a creature from the unlocked ones
    const chosen = creatures[Math.floor(Math.random() * creatures.length)];

    await insertGift(parkId, 'creature', chosen.species);
    await insertCreatureToPark(parkId, chosen);

    res.json({
      ok: true,
      gift: {
        type: 'creature',
        creatureId: chosen.id,
        image: chosen.src_image,
      },
    });
    return;
  }

  //if visitor is drawn
  if (giftType === 'visitor') {
    //check unlocked visitors
    const visitors = await db
      .selectFrom('park_visitors')
      .innerJoin('visitors', 'visitors.zone_id', 'park_visitors.visitor_id')
      .select([
        'visitors.id',
        'visitors.category',
        'visitors.src_image',
        'visitors.entry_price',
      ])
      .where('park_id', '=', parkId)
      .distinct()
      .execute();

    //if no visitors unlocked yet insert a default visitor
    if (visitors.length === 0) {
      const defaultVisitor = await db
        .selectFrom('visitors')
        .select(['id', 'category', 'src_image', 'entry_price'])
        .where('id', '=', 1)
        .executeTakeFirst();

      if (defaultVisitor === undefined) {
        res.json({
          ok: false,
          message: 'no creature available',
        });
        return;
      }

      await insertGift(parkId, 'visitor', `visitor-${defaultVisitor.category}`);
      await insertVisitorToPark(parkId, defaultVisitor);
      await updateWallet(parkId, defaultVisitor.entry_price);
    }

    //else draw a visitor from the unlocked ones
    const chosen = visitors[Math.floor(Math.random() * visitors.length)];

    await insertGift(parkId, 'visitor', `visitor-${chosen.category}`);
    await insertVisitorToPark(parkId, chosen);
    await updateWallet(parkId, chosen.entry_price);

    res.json({
      ok: true,
      gift: {
        type: 'visitor',
        creatureId: chosen.category,
        image: chosen.src_image,
      },
    });
    return;
  }

  //if moons is drawn
  if (giftType === 'moons') {
    const amounts = [500, 1000, 1500, 2000];
    const prize = amounts[Math.floor(Math.random() * amounts.length)];

    await insertGift(parkId, 'moons', String(prize));
    await updateWallet(parkId, prize);

    res.json({
      ok: true,
      gift: {
        type: 'moons',
        moons: prize,
      },
    });
    return;
  }

  res.json({ ok: false });
});

export default getGiftRoute;
