import { type Request, Router } from 'express';
import { sql } from 'kysely';

import { db } from '@app/backend-shared';

const getRankRoute = Router();

async function getRank() {
  return (
    db
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
            THEN 1 END
          )`.as('creatures_nourries'),
          ])
          .groupBy('pc.park_id')
          .as('pc'),
        'p.id',
        'pc.park_id',
      )
      .leftJoin(
        db
          .selectFrom('park_visitors')
          .select([
            'park_id',
            sql<number>`COUNT(DISTINCT visitor_id)`.as('total_visiteurs'),
          ])
          .groupBy('park_id')
          .as('pv'),
        'p.id',
        'pv.park_id',
      )
      //COALESCE pour eviter les null et avoir 0
      .select([
        'p.id',
        'p.park_name',
        'p.wallet',
        'u.username',
        sql<number>`COALESCE(pc.creatures_nourries, 0)`.as(
          'nb_creatures_nourries',
        ),
        sql<number>`COALESCE(pv.total_visiteurs, 0)`.as('nb_visiteurs'),
      ])
      .orderBy('nb_creatures_nourries', 'desc')
      .orderBy('p.wallet', 'desc')
      .orderBy('nb_visiteurs', 'desc')
      .limit(10)
      .execute()
  );
}

export type Rank = Awaited<ReturnType<typeof getRank>>[number];

getRankRoute.get('/rank', async (_req: Request, res) => {
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
export default getRankRoute;
