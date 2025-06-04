import { type Request, Router } from 'express';
import { sql } from 'kysely';

import { db } from '@app/backend-shared';

const getleaderboard = Router();

async function getRank() {
  return db
    .selectFrom('parks as p')
    .leftJoin('users as u', 'p.user_id', 'u.id')
    .leftJoin(
      db
        .selectFrom('park_creatures as pc')
        .innerJoin('creatures as c', 'pc.creature_id', 'c.id')
        .select([
          'pc.park_id',
          sql<number>`COUNT(CASE 
            WHEN pc.feed_date >= DATE_SUB(NOW(), INTERVAL c.feed_timer MINUTE) 
            THEN 1 END)`.as('active_creature'),
        ])
        .groupBy('pc.park_id')
        .as('pc'),
      'p.id',
      'pc.park_id',
    )
    .leftJoin(
      db
        .selectFrom('park_visitors as pv')
        .select(['pv.park_id', sql<number>`COUNT(pv.visitor_id)`.as('visitor')])
        .groupBy('pv.park_id')
        .as('pv_stats'),
      'p.id',
      'pv_stats.park_id',
    )
    .select([
      'p.id',
      'p.park_name',
      'p.wallet',
      'u.username',
      sql<number>`COALESCE(pc.active_creature, 0)`.as('active_creatures'),
      sql<number>`COALESCE(pv_stats.visitor, 0)`.as('total_visitors'),
    ])
    .orderBy('active_creatures', 'desc')
    .orderBy('p.wallet', 'desc')
    .orderBy('total_visitors', 'desc')
    .limit(10)
    .execute();
}

export type Rank = Awaited<ReturnType<typeof getRank>>[number];

getleaderboard.get('/leaderboard', async (_req: Request, res) => {
  const rank = await getRank();

  if (rank.length === 0) {
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
export default getleaderboard;
