import { CronJob } from 'cron';
import { sql } from 'kysely';

import { db } from '@app/backend-shared';

new CronJob(
  '* * * * *', // cronTime each minute

  async function () {
    //recovers count visitor and creatures, acitve/inactive/total
    const parkCreaturesVisitors = await db
      .selectFrom('park_creatures')
      .innerJoin(
        'park_visitors',
        'park_creatures.park_id',
        'park_visitors.park_id',
      )
      .leftJoin('parks', 'park_creatures.park_id', 'parks.id')
      .select([
        'park_creatures.park_id',
        'parks.entry_price',
        // sql<number>`COUNT(DISTINCT park_creatures.id)`.as('total_creatures'),
        sql<number>`COUNT(DISTINCT CASE WHEN park_creatures.feed_date > NOW() THEN park_creatures.id END)`.as(
          'active_creatures',
        ),
        // sql<number>`COUNT(DISTINCT CASE WHEN park_creatures.feed_date < NOW() THEN park_creatures.id END)`.as(
        //   'inactive_creatures',
        // ),
        // sql<number>`COUNT(DISTINCT park_visitors.id)`.as('total_visitors'),
        sql<number>`COUNT(DISTINCT CASE WHEN park_visitors.exit_time > NOW() THEN park_visitors.id END)`.as(
          'active_visitors',
        ),
        // sql<number>`COUNT(DISTINCT CASE WHEN park_visitors.exit_time < NOW() THEN park_visitors.id END)`.as(
        //   'inactive_visitors',
        // ),
      ])
      .groupBy('park_creatures.park_id')
      .execute();

    // if no result stop the function
    if (parkCreaturesVisitors.length === 0) {
      return;
    }

    //recovers id of all parks
    // const parkIds = parkCreaturesVisitors.map((park) => park.park_id);

    //-----------------
    //recovers park id where active creature = 0
    const parkIdsNoCreaturesActive = parkCreaturesVisitors
      .filter((park) => park.active_creatures === 0)
      .map((park) => park.park_id);

    //if 0 creature active -> exit all visitors which are not yet exit + add 2h to entry_time
    await db
      .updateTable('park_visitors')
      .set({
        exit_time: sql`NOW()`,
        entry_time: sql`NOW() + INTERVAL 2 HOUR`,
      })
      .where('exit_time', '>', new Date())
      .where('entry_time', '>', new Date())
      .where('park_id', 'in', parkIdsNoCreaturesActive)
      .execute();

    //-------------
    //recovers id park where active creature < active visitor
    const parkIdsNeedToExitVisitors = parkCreaturesVisitors
      .filter((park) => park.active_creatures < park.active_visitors)
      .map((park) => park.park_id);

    //we exit visitors which are in
    await db
      .updateTable('park_visitors')
      .set({
        exit_time: sql`NOW()`,
        entry_time: sql`NOW() + INTERVAL 2 HOUR`,
      })
      .where('park_id', 'in', parkIdsNeedToExitVisitors)
      .where('exit_time', '>', new Date())
      // .limit()
      .execute();

    //---------
    //recovers id park where active creature > active visitor
    const parkIdsNeedToWelcomeVisitors = parkCreaturesVisitors
      .filter((park) => park.active_creatures >= park.active_visitors)
      .map((park) => park.park_id);

    //we let entry visitor were exit and check if they CAN entry (entry_time < now)
    const updateVisitors = await db
      .updateTable('park_visitors')
      .set({
        exit_time: sql`NOW() + INTERVAL 4 HOUR`,
        entry_time: sql`NOW()`,
        //faire en sql
        visitor_id: sql<number>`FLOOR(RANDOM() * 4) + 1`,
      })
      .where('exit_time', '<', new Date())
      .where('entry_time', '<', new Date())
      .where('park_id', 'in', parkIdsNeedToWelcomeVisitors)
      // .limit()
      .executeTakeFirst();

    //update wallet when we add visitor
    await db
      .updateTable('parks')
      .set({
        wallet: sql`wallet + entry_price * ${Number(updateVisitors.numUpdatedRows)}`,
      })
      //si je ne reprends pas le num update, idem je dois me servir du limit
      .where('parks.id', 'in', parkIdsNeedToWelcomeVisitors)
      .execute();
  },
  null, // onComplete
  true, // start
  'Europe/Paris', // timeZone
);
