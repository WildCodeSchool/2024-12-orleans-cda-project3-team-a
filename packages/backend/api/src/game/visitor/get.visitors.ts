import { type Request, Router } from 'express';

import { db } from '@app/backend-shared';

const getVisitorsRoute = Router();

function getVisitors(parkId: number) {
  return db
    .selectFrom('visitors')
    .leftJoin('park_visitors', (join) =>
      join
        .onRef('park_visitors.visitor_id', '=', 'visitors.id')
        .on('park_visitors.park_id', '=', parkId),
    )
    .select([
      'park_visitors.visitor_id',
      'visitors.src_image',
      'visitors.category',
      'visitors.entry_price',
      ({ fn }) => fn.count('park_visitors.visitor_id').as('visitor_count'),
    ])
    .groupBy([
      'park_visitors.visitor_id',
      'visitors.src_image',
      'visitors.category',
      'visitors.entry_price',
    ])
    .execute();
}

function getVisitorsPark(parkId: number) {
  return db
    .selectFrom('park_visitors')
    .selectAll()
    .where('park_visitors.park_id', '=', parkId)
    .execute();
}

export type Visitors = Awaited<ReturnType<typeof getVisitors>>;
export type VisitorsPark = Awaited<ReturnType<typeof getVisitorsPark>>;

getVisitorsRoute.get('/', async (req: Request, res) => {
  const parkId = req.parkId;

  if (parkId === undefined) {
    res.json({
      ok: false,
      message: 'no park id in get visitors',
    });
    return;
  }

  // to have the number of each visitor (id 1,2 ,3, 4)
  const visitorsCountById = await getVisitors(parkId);

  if (visitorsCountById.length === 0) {
    res.json({
      ok: false,
      message: 'no visitors found',
    });
    return;
  }

  const visitorsPark = await getVisitorsPark(parkId);
  if (visitorsPark.length === 0) {
    res.json({
      ok: false,
      message: 'no visitors found',
    });
    return;
  }

  res.json({
    ok: true,
    visitorsCountById,
    visitorsPark,
  });
});

export default getVisitorsRoute;
