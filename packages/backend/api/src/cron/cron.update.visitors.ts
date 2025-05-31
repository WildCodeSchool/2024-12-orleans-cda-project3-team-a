import { CronJob } from 'cron';
import { sql } from 'kysely';

import { db } from '@app/backend-shared';

new CronJob(
  '* * * * *', // cronTime each minute

  async function () {
    console.log('cron tourne');

    //recovers count visitor and creatures active
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
        sql<number>`COUNT(DISTINCT CASE WHEN park_creatures.feed_date > NOW() THEN park_creatures.id END)`.as(
          'active_creatures',
        ),
        sql<number>`COUNT(DISTINCT CASE WHEN park_visitors.exit_time > NOW() THEN park_visitors.id END)`.as(
          'active_visitors',
        ),
        sql<number>`COUNT(DISTINCT CASE WHEN park_visitors.exit_time <= NOW() THEN park_visitors.id END)`.as(
          'inactive_visitors',
        ),
      ])
      .groupBy('park_creatures.park_id')
      .execute();

    // if no result stop the function
    if (parkCreaturesVisitors.length === 0) {
      return;
    }

    //recovers park id where we have at least 1 visitor inactiv to let entry him, condition! we have at least 1 creature active
    const parkIdsVisitorsInactive = parkCreaturesVisitors
      .filter((park) => park.inactive_visitors > 0 && park.active_creatures > 0)
      .map((park) => park.park_id);
    console.log('no visiteur active', parkIdsVisitorsInactive);

    const parkIdsVisitorsActive = parkCreaturesVisitors
      .filter((park) => park.active_visitors > 0)
      .map((park) => park.park_id);
    console.log('visiteur actif', parkIdsVisitorsActive);

    if (parkIdsVisitorsInactive.length > 0) {
      await Promise.all([
        //check if the visitor has finished his turn and add the entry price(1) and update the exit time and entry time(2)
        //1- update wallet
        db
          .updateTable('parks')
          .set({
            //We recover the sum of entry price by visitor for those who are out
            wallet: sql`
      wallet + (
        SELECT COALESCE(SUM(visitors.entry_price), 0)
        FROM park_visitors
        JOIN visitors ON visitors.id = park_visitors.visitor_id
        WHERE park_visitors.park_id = parks.id
          AND park_visitors.exit_time < NOW()
      )
    `,
          })
          //we add the entry price especially for parks with outgoing visitors, avoid to add + 0
          .where('parks.id', 'in', parkIdsVisitorsInactive)
          .execute(),

        //2- update date in park_visitors
        db
          .updateTable('park_visitors')
          .set({
            entry_time: sql`NOW() `,
            exit_time: sql`NOW() + INTERVAL 4 HOUR`,
          })
          .where('park_visitors.park_id', 'in', parkIdsVisitorsInactive)
          .where('exit_time', '<', new Date())
          .execute(),
      ]);
    }

    //update wallet with visitors who spending money each money according to the number creature active
    await db
      .updateTable('parks')
      .set({
        //we sum the number of creature active and multiply by his id number to get a price that we earn each minute
        wallet: sql`
      wallet + (
        SELECT COALESCE(SUM(
          CASE WHEN feed_date > NOW() THEN 1 ELSE 0 END * creature_id
        ), 0)
        FROM park_creatures
        WHERE park_creatures.park_id = parks.id
      )
    `,
      })
      //we add the entry price especially for parks with outgoing visitors, avoid to add + 0
      .where('parks.id', 'in', parkIdsVisitorsActive)
      .execute();
  },
  null, // onComplete
  true, // start
  'Europe/Paris', // timeZone
);
