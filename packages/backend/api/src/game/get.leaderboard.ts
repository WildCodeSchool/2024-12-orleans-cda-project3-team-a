import { type Request, Router } from 'express';
import { sql } from 'kysely';

import { db } from '@app/backend-shared';

const getleaderboard = Router();

async function getRank() {
  return (
    db
      .selectFrom('parks as p')
      .leftJoin('users as u', 'p.user_id', 'u.id')
      .leftJoin('avatars', 'avatars.id', 'u.avatar_id')
      //recover creatures active
      .leftJoin(
        db
          .selectFrom('park_creatures as pc')
          .innerJoin('creatures as c', 'pc.creature_id', 'c.id')
          .select(({ fn }) => [
            'pc.park_id',
            fn.count<number>('pc.id').as('active_creatures'),
          ])
          .where('pc.feed_date', '>', sql<Date>`NOW()`)
          .groupBy('pc.park_id')
          .as('pc'),
        'p.id',
        'pc.park_id',
      )

      //recover visitors active
      .leftJoin(
        db
          .selectFrom('park_visitors as pv')
          .select(({ fn }) => [
            'pv.park_id',
            fn.count<number>('pv.id').as('active_visitors'),
          ])
          .where('pv.exit_time', '>', sql<Date>`NOW()`)
          .groupBy('pv.park_id')
          .as('pv'),
        'p.id',
        'pv.park_id',
      )

      .select([
        'p.id',
        'p.park_name',
        'p.wallet',
        'u.username',
        'u.avatar_id',
        'avatars.src_image',
        sql<number>`COALESCE(pc.active_creatures, 0)`.as('active_creatures'),
        sql<number>`COALESCE(pv.active_visitors, 0)`.as('active_visitors'),
      ])
      .orderBy('active_creatures', 'desc')
      .orderBy('p.wallet', 'desc')
      .orderBy('active_visitors', 'desc')
      .limit(10)
      .execute()
  );
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
