import express from 'express';
import { sql } from 'kysely';

import { db } from '@app/backend-shared';

const getRankRoute = express.Router();

function getRank() {
  return db
    .selectFrom('parks as p')
    .leftJoin('park_creatures as pc', 'p.id', 'pc.park_id')
    .select([
      'p.id',
      'p.park_name',
      'p.wallet',
      sql<number>`SUM(CASE WHEN pc.feed_date IS NOT NULL THEN 1 ELSE 0 END)`.as(
        'nb_creatures_nourries',
      ),
      sql<number>`COUNT(pc.creature_id)`.as('nb_creatures_total'),
    ])
    .groupBy(['p.id', 'p.park_name', 'p.wallet'])
    .orderBy('nb_creatures_nourries', 'desc')
    .orderBy('p.wallet', 'desc')
    .orderBy('nb_creatures_total', 'desc')
    .limit(10)
    .execute();
}

export type Rank = Awaited<ReturnType<typeof getRank>>[number];

getRankRoute.get('/rank', async (_req, res) => {
  const rank = await getRank();

  if (!rank) {
    res.json({
      ok: false,
      message: 'No parks found',
    });
    return;
  }

  res.json({
    ok: true,
    rank,
  });
});

export default getRankRoute;
