import { CronJob } from 'cron';
import { sql } from 'kysely';

import type { VisitorsPark } from '@app/api';
import { db } from '@app/backend-shared';

new CronJob(
  // '* * * * *', // cronTime each minute
  '*/15 * * * * *',

  async function () {
    //recovers count visitor and creatures active
    const parkCreaturesVisitors = await db
      .selectFrom('parks')
      .leftJoin('park_creatures', 'park_creatures.park_id', 'parks.id')
      .leftJoin(
        'park_visitors',
        'park_creatures.park_id',
        'park_visitors.park_id',
      )
      .leftJoin('park_zones', 'park_zones.park_id', 'parks.id')
      .select([
        'parks.id',
        sql<number>`COUNT(DISTINCT CASE WHEN park_creatures.feed_date > NOW() THEN park_creatures.id END)`.as(
          'active_creatures',
        ),
        sql<number>`COUNT(DISTINCT park_creatures.id)`.as('total_creatures'),
        sql<Date>`MAX(park_creatures.feed_date)`.as('last_hungry'),
        sql<number>`COUNT(DISTINCT CASE WHEN park_visitors.exit_time > NOW() THEN park_visitors.id END)`.as(
          'active_visitors',
        ),
        sql<number>`COUNT(DISTINCT park_creatures.id) - COUNT(DISTINCT CASE WHEN park_visitors.exit_time > NOW() THEN park_visitors.id END)`.as(
          'nb_visitor_to_add',
        ),
        sql<number>`COUNT(DISTINCT park_zones.id)`.as('nb_zones_unlocked'),
      ])
      .groupBy('park_creatures.park_id')
      .execute();

    console.log('park creature', parkCreaturesVisitors);

    // if no result stop the function
    if (parkCreaturesVisitors.length === 0) {
      return;
    }

    //we add visitor in the park only when the last creature is not hungry more than 2 days and if active visitor < total creature
    const parkIdsCanAcceptVisitors = parkCreaturesVisitors
      .filter(
        (park) =>
          park.last_hungry > new Date(Date.now() - 2 * 24 * 60 * 60 * 1000) &&
          park.active_visitors < park.total_creatures,
      )
      .map((park) => park.id);

    // console.log("park id concerné ",parkIdsCanAcceptVisitors);
    //Generate table to add in the insert of park_visitors
    const dataVisitorsToInsertByGroup = parkCreaturesVisitors
      .filter((park) => park.nb_visitor_to_add > 0)
      .map((park) => {
        const visitors = Array.from({ length: park.nb_visitor_to_add }, () => ({
          entry_time: new Date(),
          exit_time: new Date(Date.now() + 4 * 60 * 60 * 1000),
          park_id: park.id,
          visitor_id: Math.floor(Math.random() * park.nb_zones_unlocked) + 1,
        }));

        return {
          park_id: park.id,
          visitors,
        };
      });

    console.log(dataVisitorsToInsertByGroup);

    const entryPriceByVisitorId = await db
      .selectFrom('visitors')
      .select(['entry_price', 'id'])
      .execute();

    const entryPriceToAdd = 10;
    //recover the number of visitor added by visitor_id by park_id
    //and recover with table visitors the entry_price of a visitor id

    //----------------------------------------------------------------
    //-----------------ADD NEW VISITOR AND ENTRY PRICE----------------
    //----------------------------------------------------------------
    if (parkIdsCanAcceptVisitors.length > 0) {
      await Promise.all([
        //1- insert visitor
        db
          .insertInto('park_visitors')
          .values(
            dataVisitorsToInsertByGroup.flatMap((group) => group.visitors),
          )
          .execute(),

        //2- update wallet // faire boucle avec nouveau modele, tableau avec les requete et promise all dessus
        db
          .updateTable('parks')
          .set({
            //We recover the sum of entry price by visitor
            wallet: sql`
      wallet + ${entryPriceToAdd}`,
          })
          //we add the entry price especially for parks with outgoing visitors, avoid to add + 0
          .where('parks.id', 'in', parkIdsCanAcceptVisitors)
          .execute(),
      ]);
    }

    //----------------------------------------------------------------
    //-----------------ADD PROFIT IF CREATURE ACTIVE------------------
    //----------------------------------------------------------------

    //recover park where we have to add a profit time
    const parkIdsCreaturesActive = parkCreaturesVisitors
      .filter((park) => park.active_creatures > 0)
      .map((park) => park.id);

    if (parkIdsCreaturesActive.length > 0) {
      //update wallet with visitors who spending money each money according to the number creature active
      await db
        .updateTable('parks')
        .set({
          //we sum the number of creature active and multiply by his profit
          wallet: sql`
        wallet + (
          SELECT COALESCE(SUM( 1 
          * (SELECT profit FROM creatures WHERE park_creatures.creature_id = creatures.id) 
          ), 0)
          FROM park_creatures
          WHERE park_creatures.park_id = parks.id
          AND park_creatures.feed_date > NOW()
        )
      `,
        })
        //we add the entry price especially for parks with outgoing visitors, avoid to add + 0
        .where('parks.id', 'in', parkIdsCreaturesActive)
        .execute();
    }
  },
  null, // onComplete
  true, // start
  'Europe/Paris', // timeZone
);
