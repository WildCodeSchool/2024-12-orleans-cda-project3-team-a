import { type Request, Router } from 'express';
import { sql } from 'kysely';

import { db } from '@app/backend-shared';

const getRankRoute = Router();

async function getRank() {
  const rank = await db
    .selectFrom('parks as p')
    .leftJoin('users as u', 'p.user_id', 'u.id')
    .leftJoin('park_creatures as pc', 'p.id', 'pc.park_id')
    .leftJoin('park_visitors as pv', 'p.id', 'pv.park_id')
    .select([
      'p.id',
      'p.park_name',
      'p.wallet',
      'u.username',
      sql<number>`COUNT(DISTINCT pc.id)`.as('nb_creatures'),
      sql<number>`COUNT(DISTINCT pv.id)`.as('nb_visiteurs'),
    ])
    .groupBy(['p.id', 'p.park_name', 'p.wallet', 'u.username'])
    .orderBy('nb_creatures', 'desc')
    .orderBy('p.wallet', 'desc')
    .limit(10)

    .execute();

  return rank;
}

export type Rank = Awaited<ReturnType<typeof getRank>>[number];

getRankRoute.get('/rank', async (_req: Request, res) => {
  const rank = await getRank();

  if (!rank || rank.length === 0) {
    return res.status(404).json({
      ok: false,
      message: 'No rank',
    });
  }

  res.json({
    ok: true,
    rank,
  });
});
export default getRankRoute;
