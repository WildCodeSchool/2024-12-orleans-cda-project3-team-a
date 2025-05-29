import { CronJob } from 'cron';
import { sql } from 'kysely';

import { db } from '@app/backend-shared';

new CronJob(
  '* * * * *', // cronTime each minute

  async function () {
    console.log('ca tourne');
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
        sql<number>`COUNT(DISTINCT park_creatures.id)`.as('total_creatures'),
        sql<number>`COUNT(DISTINCT CASE WHEN park_creatures.feed_date > NOW() THEN park_creatures.id END)`.as(
          'active_creatures',
        ),
        sql<number>`COUNT(DISTINCT CASE WHEN park_creatures.feed_date < NOW() THEN park_creatures.id END)`.as(
          'inactive_creatures',
        ),
        sql<number>`COUNT(DISTINCT park_visitors.id)`.as('total_visitors'),
        sql<number>`COUNT(DISTINCT CASE WHEN park_visitors.exit_time > NOW() THEN park_visitors.id END)`.as(
          'active_visitors',
        ),
        sql<number>`COUNT(DISTINCT CASE WHEN park_visitors.exit_time < NOW() THEN park_visitors.id END)`.as(
          'inactive_visitors',
        ),
      ])
      .groupBy('park_creatures.park_id')
      .execute();

    // if no result stop the function
    if (parkCreaturesVisitors.length === 0) {
      return;
    }

    //Loop to update all parks
    for (const park of parkCreaturesVisitors) {
      //if 0 creature active -> exit all visitors which are not yet exit + add 2h to entry_time and next park
      if (park.active_creatures === 0) {
        await db
          .updateTable('park_visitors')
          .set({
            exit_time: sql`NOW()`,
            entry_time: sql`NOW() + INTERVAL 2 HOUR`,
          })
          .where('exit_time', '>', new Date())
          .where('park_id', '=', park.park_id)
          .execute();
        //next park
        continue;
      }

      //count the nb of line we have to update
      const countUpdateLineVisitor =
        park.active_creatures - park.active_visitors;

      //if is negative we exit the correct number of visitor not yet exit
      if (countUpdateLineVisitor < 0) {
        await db
          .updateTable('park_visitors')
          .set({
            exit_time: sql`NOW()`,
            entry_time: sql`NOW() + INTERVAL 2 HOUR`,
          })
          .where('park_id', '=', park.park_id)
          .where('exit_time', '>', new Date())
          .limit(countUpdateLineVisitor * -1)
          .execute();
      }

      //if is positive we let entry visitor were out and check if they CAN entry (entry_time < now)
      else if (countUpdateLineVisitor > 0) {
        //update the number of line necessary to entry
        const updateVisitors = await db
          .updateTable('park_visitors')
          .set({
            exit_time: sql`NOW() + INTERVAL 4 HOUR`,
            entry_time: sql`NOW()`,
            visitor_id: Math.floor(Math.random() * 4) + 1,
          })
          .where('exit_time', '<', new Date())
          .where('entry_time', '<', new Date())
          .where('park_id', '=', park.park_id)
          .limit(countUpdateLineVisitor)
          .executeTakeFirst();

        //if cpuntUpdate>0 update wallet : nb visitor added * entryprice
        await db
          .updateTable('parks')
          .set((eb) => ({
            wallet: eb(
              'wallet',
              '+',
              (park.entry_price ?? 0) * Number(updateVisitors.numUpdatedRows),
            ),
          }))
          .where('parks.id', '=', park.park_id)
          .execute();
      }
    }
  },
  null, // onComplete
  true, // start
  'Europe/Paris', // timeZone
);
