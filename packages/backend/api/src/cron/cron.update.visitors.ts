import { CronJob } from 'cron';
import { sql } from 'kysely';

import { db } from '@app/backend-shared';

new CronJob(
  '0 * * * * *', // cronTime
  async function () {
    //recovers info of all parks
    const parks = await db.selectFrom('parks').selectAll().execute();

    //Boucle for update all parks
    for (const park of parks) {
      //calcul nb creature active/inactive/total
      const countCreatures = await db
        .selectFrom('park_creatures')
        .select(() => [
          sql<number>`COUNT(id)`.as('total'),
          sql<number>`COUNT(CASE WHEN feed_date > NOW() THEN 1 END)`.as(
            'active',
          ),
          sql<number>`COUNT(CASE WHEN feed_date < NOW() THEN 1 END)`.as(
            'inactive',
          ),
        ])
        .where('park_id', '=', park.id)
        .executeTakeFirst();

      //calcul nb visitor active/inactive/total
      const countVisitors = await db
        .selectFrom('park_visitors')
        .select(() => [
          sql<number>`COUNT(id)`.as('total'),
          sql<number>`COUNT(CASE WHEN exit_time < NOW() THEN 1 END)`.as(
            'inactive',
          ),
          sql<number>`COUNT(CASE WHEN exit_time > NOW() THEN 1 END)`.as(
            'active',
          ),
        ])
        .where('park_id', '=', park.id)
        .executeTakeFirst();

      //check if we have results
      if (!countCreatures || !countVisitors) {
        continue;
      }

      //if 0 creature active -> exit all visitor  + add 2h to entry_time and exit boucle for
      if (countCreatures.active === 0) {
        await db
          .updateTable('park_visitors')
          .set({
            exit_time: sql`NOW()`,
            entry_time: sql`NOW() + INTERVAL 2 HOUR`,
          })
          .where('exit_time', '>', new Date())
          .where('park_id', '=', park.id)
          .execute();
        //exit the boucle
        continue;
      }

      //count the nb of line we have to update
      const countUpdateLineVisitor =
        countCreatures.active - countVisitors.active;

      //if is negative we exit the correct number of visitor not yet exit
      if (countUpdateLineVisitor < 0) {
        //recover a table to know which id to modify
        const visitorsNeedToExit = await db
          .selectFrom('park_visitors')
          .select('id')
          .where('exit_time', '>', new Date())
          .where('park_id', '=', park.id)
          .limit(countUpdateLineVisitor * -1)
          .execute();

        //update id line necessary to exit
        for (const visitorNeedToExit of visitorsNeedToExit) {
          await db
            .updateTable('park_visitors')
            .set({
              exit_time: sql`NOW()`,
              entry_time: sql`NOW() + INTERVAL 2 HOUR`,
            })
            .where('park_id', '=', park.id)
            .where('id', '=', visitorNeedToExit.id)
            .execute();
        }

        //if is positive we let entry visitor were out
      } else if (countUpdateLineVisitor > 0) {
        //recover a table to know which id to modify
        const visitorsNeedToEntry = await db
          .selectFrom('park_visitors')
          .select('id')
          .where('exit_time', '<', new Date())
          .where('entry_time', '<', new Date())
          .where('park_id', '=', park.id)
          .limit(countUpdateLineVisitor)
          .execute();

        //update only the id line necessary to entry
        for (const visitorNeedToEntry of visitorsNeedToEntry) {
          await db
            .updateTable('park_visitors')
            .set({
              exit_time: sql`NOW() + INTERVAL 4 HOUR`,
              entry_time: sql`NOW()`,
              visitor_id: Math.floor(Math.random() * 4) + 1,
            })
            .where('park_id', '=', park.id)
            .where('id', '=', visitorNeedToEntry.id)
            .execute();
        }

        //if count>0 update wallet : nb visitor added * entryprice /!\
        await db
          .updateTable('parks')
          .set((eb) => ({
            wallet: eb(
              'wallet',
              '+',
              park.entry_price * visitorsNeedToEntry.length,
            ),
          }))
          .where('parks.id', '=', park.id)
          .execute();
      }
    }
  },
  null, // onComplete
  true, // start
  'Europe/Paris', // timeZone
);
