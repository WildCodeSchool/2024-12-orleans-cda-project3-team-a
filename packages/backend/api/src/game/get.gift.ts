import { type Request, Router } from 'express';
import { sql } from 'kysely';

import { db } from '@app/backend-shared';
import { nameGenerator } from '@app/shared';

const getGiftsRoute = Router();

function getLastGift(parkId: number) {
  return db
    .selectFrom('park_gifts')
    .select(['gift_date'])
    .where('park_id', '=', parkId)
    .where('gift_date', '>', sql<Date>`NOW() - INTERVAL HOUR`)
    .execute();
}

getGiftsRoute.get('/gift', async (req: Request, res) => {
  const parkId = req.parkId;

  if (parkId === undefined) {
    res.json({
      ok: false,
    });
    return;
  }

  const lastGift = await getLastGift(parkId);

  if (lastGift.length > 0) {
    res.json({
      ok: false,
      message: 'Too soon for a new gift.',
    });
    return;
  }
  const gifts = [{ type: 'creature' }, { type: 'visitor' }, { type: 'moons' }];

  function getRandomGift() {
    const randomGift = Math.floor(Math.random() * gifts.length);
    return gifts[randomGift];
  }

  const gift = getRandomGift();

  if (gift.type === 'creature') {
    const creatureToDraw = await db
      .selectFrom('park_creatures')
      .innerJoin('creatures', 'creatures.id', 'park_creatures.creature_id')
      .select([
        'park_creatures.creature_id',
        'creatures.feed_timer',
        'creatures.src_image',
        'creatures.species',
      ])
      .where('park_id', '=', parkId)
      .distinct()
      .execute();

    if (creatureToDraw.length === 0) {
      const drawnCreature = await db
        .selectFrom('creatures')
        .select(['id', 'species', 'feed_timer', 'creatures.src_image'])
        .where('id', '=', 1)
        .executeTakeFirst();

      if (drawnCreature === undefined) {
        res.json({
          ok: false,
          message: 'no creature available',
        });
        return;
      }

      await db
        .insertInto('park_gifts')
        .values({
          type: 'creature',
          gift_date: sql`NOW()`,
          value: drawnCreature.species,
          park_id: parkId,
        })
        .executeTakeFirst();

      const randomName = nameGenerator();
      const gender = Math.random() < 0.5 ? 'male' : 'female';

      await db
        .insertInto('park_creatures')
        .values({
          name: randomName,
          gender,
          is_adult: 1,
          is_parent: 0,
          feed_date: sql`NOW() + INTERVAL ${drawnCreature.feed_timer} MINUTE`,
          adult_at: sql`NOW()`,
          park_id: parkId,
          creature_id: drawnCreature.id,
        })
        .executeTakeFirst();
    }

    function getRandomCreature() {
      const randomCreature = Math.floor(Math.random() * creatureToDraw.length);
      return creatureToDraw[randomCreature];
    }

    const creature = getRandomCreature();

    await db
      .insertInto('park_gifts')
      .values({
        type: 'creature',
        gift_date: sql`NOW()`,
        value: creature.species,
        park_id: parkId,
      })
      .executeTakeFirst();

    const randomName = nameGenerator();
    const gender = Math.random() < 0.5 ? 'male' : 'female';

    await db
      .insertInto('park_creatures')
      .values({
        name: randomName,
        gender,
        is_adult: 1,
        is_parent: 0,
        feed_date: sql`NOW() + INTERVAL ${creature.feed_timer} MINUTE`,
        adult_at: sql`NOW()`,
        park_id: parkId,
        creature_id: creature.creature_id,
      })
      .executeTakeFirst();

    res.json({
      ok: true,
      gift: {
        type: 'creature',
        creatureId: creature.creature_id,
        image: creature.src_image,
      },
    });
    return;
  }

  if (gift.type === 'visitor') {
    const visitorToDraw = await db
      .selectFrom('park_visitors')
      .innerJoin('visitors', 'visitors.zone_id', 'park_visitors.visitor_id')
      .select([
        'park_visitors.visitor_id',
        'visitors.category',
        'visitors.src_image',
      ])
      .where('park_id', '=', parkId)
      .distinct()
      .execute();

    if (visitorToDraw.length === 0) {
      const drawnVisitor = await db
        .selectFrom('visitors')
        .select(['id', 'category', 'visitors.src_image'])
        .where('id', '=', 1)
        .executeTakeFirst();

      if (drawnVisitor === undefined) {
        res.json({
          ok: false,
          message: 'no visitor available',
        });
        return;
      }

      await db
        .insertInto('park_gifts')
        .values({
          type: 'visitor',
          gift_date: sql`NOW()`,
          value: `category- ${drawnVisitor.category}`,
          park_id: parkId,
        })
        .executeTakeFirst();

      await db
        .insertInto('park_visitors')
        .values({
          entry_time: sql`NOW()`,
          exit_time: sql`NOW() + INTERVAL 4 HOUR`,
          park_id: parkId,
          visitor_id: drawnVisitor.id,
        })
        .executeTakeFirst();
    }

    function getRandomVisitor() {
      const randomVisitor = Math.floor(Math.random() * visitorToDraw.length);
      return visitorToDraw[randomVisitor];
    }

    const visitor = getRandomVisitor();

    await db
      .insertInto('park_gifts')
      .values({
        type: 'visitor',
        gift_date: sql`NOW()`,
        value: `category- ${visitor.category}`,
        park_id: parkId,
      })
      .executeTakeFirst();

    await db
      .insertInto('park_visitors')
      .values({
        entry_time: sql`NOW()`,
        exit_time: sql`NOW() + INTERVAL 4 HOUR`,
        park_id: parkId,
        visitor_id: visitor.visitor_id,
      })
      .executeTakeFirst();

    res.json({
      ok: true,
      gift: {
        type: 'visitor',
        visitor: visitor.category,
        image: visitor.src_image,
      },
    });
    return;
  }

  if (gift.type === 'moons') {
    const amounts = [
      { amount: 500 },
      { amount: 1000 },
      { amount: 1500 },
      { amount: 2000 },
    ];

    function getRandomAmount() {
      const randomPrize = Math.floor(Math.random() * amounts.length);
      return amounts[randomPrize];
    }

    const prize = getRandomAmount();

    await db
      .insertInto('park_gifts')
      .values({
        type: 'moons',
        gift_date: sql`NOW()`,
        value: String(prize.amount),
        park_id: parkId,
      })
      .executeTakeFirst();

    await db
      .updateTable('parks')
      .set((eb) => ({
        wallet: eb('wallet', '+', prize.amount),
      }))
      .where('id', '=', parkId)
      .executeTakeFirst();

    res.json({
      ok: true,
      gift: {
        type: 'moons',
        moons: prize.amount,
      },
    });
    return;
  }
});

export default getGiftsRoute;
