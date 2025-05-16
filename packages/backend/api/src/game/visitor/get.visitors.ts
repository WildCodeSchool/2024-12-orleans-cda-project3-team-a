import { type Request, Router } from 'express';

import { db } from '@app/backend-shared';

const getVisitors = Router();

getVisitors.get('/', async (req: Request, res) => {
  const parkId = req.parkId;

  if (parkId === undefined) {
    res.json({
      ok: false,
      message: 'no park id in get visitors',
    });
    return;
  }

  const visitorsCountById = await db
    .selectFrom('visitors')
    .leftJoin('park_visitors', (join) =>
      join
        .onRef('park_visitors.visitor_id', '=', 'visitors.id')
        .on('park_visitors.park_id', '=', parkId),
    )
    .select([
      'park_visitors.visitor_id',
      'visitors.src_image',
      'visitors.spending',
      'visitors.spending_time',
      ({ fn }) => fn.count('park_visitors.visitor_id').as('visitor_count'),
    ])
    .groupBy([
      'park_visitors.visitor_id',
      'visitors.src_image',
      'visitors.spending',
      'visitors.spending_time',
    ])
    .execute();

  if (!visitorsCountById) {
    res.json({
      ok: false,
      message: 'no visitors finded',
    });
  }

  res.json({
    ok: true,
    visitorsCountById,
  });
});

export default getVisitors;
