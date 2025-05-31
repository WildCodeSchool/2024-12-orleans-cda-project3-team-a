import type { Request } from 'express';
import express from 'express';

import { db } from '@app/backend-shared';

const postPark = express.Router();

postPark.post('/', async (req: Request, res) => {
  const userId = req.userId;
  const { parkName } = req.body;

  if (userId === undefined) {
    res.json({
      ok: false,
      message: 'userId empty',
    });
    return;
  }

  //check if we have already a park id for this user
  const park = await db
    .selectFrom('parks')
    .select('parks.id')
    .where('parks.user_id', '=', userId)
    .executeTakeFirst();

  if (park) {
    res.json({
      ok: false,
      message: 'already have an id park',
    });
    return;
  }

  //if not already have an id -> insert into parks
  const insertedPark = await db
    .insertInto('parks')
    .values({
      user_id: userId,
      park_name: parkName,
      wallet: 100,
    })
    .executeTakeFirst();

  const parkId = Number(insertedPark.insertId);
  if (!parkId) {
    res.json({
      ok: false,
      message: 'no park id created',
    });
    return;
  }

  //add the park_id just created and the first zone
  await db
    .insertInto('park_zones')
    .values({
      park_id: parkId,
      zone_id: 1,
    })
    .executeTakeFirst();

  res.json({
    ok: true,
    message: 'parkId created and first zone added',
  });
});

export default postPark;
