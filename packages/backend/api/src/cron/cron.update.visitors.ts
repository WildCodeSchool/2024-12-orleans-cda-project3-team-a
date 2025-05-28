import { sql } from 'Kysely';
import { CronJob } from 'cron';

import { db } from '@app/backend-shared';

const job = new CronJob(
  '*/5 * * * * *', // cronTime
  async function () {
    console.log('You will see this message every second');

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
        return;
      }

      //count the nb of line we have to update
      const countUpdateLineVisitor =
        countCreatures.active - countVisitors.active;

      //if is negative we exit all visitors
      if (countUpdateLineVisitor < 0) {
        //update all exit time = NOW
        await db
          .updateTable('park_visitors')
          .set({
            exit_time: sql`NOW()`,
          })
          .where('exit_time', '<', new Date())
          .where('park_id', '=', park.id)
          .execute();

        //if is positive we update the necessary line for visitor
      } else if (countUpdateLineVisitor > 0) {
        //recover inactive ids in park_visitors, but LIMIT = nb line what we have to update
        const parksVisitorsToUpdate = await db
          .selectFrom('park_visitors')
          .select('id')
          .where('exit_time', '<', new Date())
          .where('park_id', '=', park.id)
          .limit(countUpdateLineVisitor)
          .execute();

        //update only the number line necessary
        for (const parkVisitorToUpdate of parksVisitorsToUpdate) {
          await db
            .updateTable('park_visitors')
            .set({
              exit_time: sql`NOW() + INTERVAL 4 HOUR`,
              entry_time: sql`NOW()`,
              visitor_id: Math.floor(Math.random() * 4) + 1,
            })
            .where('park_id', '=', park.id)
            .where('id', '=', parkVisitorToUpdate.id)
            .where('exit_time', '<', new Date())
            .execute();
        }

        //update wallet nb visitor added * entryprice
        await db
          .updateTable('parks')
          .set((eb) => ({
            wallet: eb(
              'wallet',
              '+',
              park.entry_price * countUpdateLineVisitor,
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
