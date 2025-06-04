import { type Request, Router } from 'express';

import { db } from '@app/backend-shared';

const hasCreaturesRouter = Router();

function hasCreaturesPark(parkId: number) {
  return db
    .selectFrom('park_creatures')
    .select(['id'])
    .where('park_id', '=', parkId)
    .limit(1)
    .execute();
}

hasCreaturesRouter.get('/has-creatures', async (req: Request, res) => {
  const parkId = req.parkId;

  if (parkId === undefined) {
    res.json({
      ok: false,
      message: 'parkId not found',
    });
    return;
  }

  const creatures = await hasCreaturesPark(parkId);
  const hasCreatures = creatures.length > 0;

  res.json({
    ok: true,
    hasCreatures,
    message: hasCreatures ? 'Park has creatures' : 'Park has no creatures',
  });
});

export default hasCreaturesRouter;
