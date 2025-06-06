import { CronJob } from 'cron';
import { sql } from 'kysely';
import type { NotNull } from 'kysely';

import { db } from '@app/backend-shared';

new CronJob(
  '* * * * *', // cronTime each minute

  async function () {
    //recovers count visitor and creatures active
    const parkCreaturesVisitors = await db
      .selectFrom('parks')

      .leftJoin('park_creatures', (join) =>
        join
          .onRef('park_creatures.park_id', '=', 'parks.id')
          .on(sql`park_creatures.feed_date > NOW()`),
      )

      .leftJoin('park_visitors', (join) =>
        join
          .onRef('park_visitors.park_id', '=', 'parks.id')
          .on(sql`park_visitors.exit_time > NOW()`),
      )

      .leftJoin('park_zones', 'park_zones.park_id', 'parks.id')

      .select(({ fn, eb }) => [
        'parks.id',

        fn.count<number>('park_creatures.id').as('active_creatures'),

        fn.count<number>('park_visitors.id').as('active_visitors'),

        fn.count<number>('park_zones.id').as('nb_zones_unlocked'),

        // subquery to know total_creatures
        eb
          .selectFrom('park_creatures')
          .select([fn.count<number>('id').as('total_creatures')])
          .whereRef('park_creatures.park_id', '=', 'parks.id')
          .as('total_creatures'),

        // subquery to know last feed creature
        eb
          .selectFrom('park_creatures')
          .select([fn.max('park_creatures.feed_date').as('last_hungry')])
          .whereRef('park_creatures.park_id', '=', 'parks.id')
          .as('last_hungry'),
      ])
      .groupBy('parks.id')
      .$narrowType<{ total_creatures: NotNull; last_hungry: NotNull }>()
      .execute();

    // if no result stop the function
    if (parkCreaturesVisitors.length === 0) {
      return;
    }

    //we add visitor in the park only when the last creature is not hungry more than 1 day and if active visitor < total creature
    const parkIdsCanAcceptVisitors = parkCreaturesVisitors
      .filter(
        (park) =>
          park.last_hungry > new Date(Date.now() - 1 * 24 * 60 * 60 * 1000) &&
          park.total_creatures > park.active_visitors,
      )
      .map((park) => park.id);

    //recover the table of zones unlock by park and visitor id matching + entry_price
    const parkZoneVisitor =
      parkIdsCanAcceptVisitors.length !== 0
        ? await db
            .selectFrom('park_zones')
            .innerJoin('visitors', 'visitors.zone_id', 'park_zones.zone_id')
            .select([
              'park_zones.park_id',
              'park_zones.zone_id',
              'visitors.id as visitor_id',
              'visitors.entry_price',
            ])
            .where('park_zones.park_id', 'in', parkIdsCanAcceptVisitors)
            .execute()
        : [];

    console.log('park zone visitor', parkZoneVisitor);

    // function to use to generate a visitor id random
    function getRandomVisitor(park_id: number): number {
      const parkZone = parkZoneVisitor.filter(
        (park) =>
          parkIdsCanAcceptVisitors.includes(park.park_id) &&
          park.park_id === park_id,
      );
      const randomIndex = Math.floor(Math.random() * parkZone.length);
      return parkZone[randomIndex].visitor_id;
    }

    //----------------------------------------------------
    //-----------LOGIC FOR ADD VISITOR IF IS OUT----------
    //----------------------------------------------------
    //Generate table to add in the insert of park_visitors

    const dataVisitorsToInsertByGroup = parkCreaturesVisitors
      .filter((park) => parkIdsCanAcceptVisitors.includes(park.id))
      .map((park) => {
        const visitors = Array.from(
          { length: park.total_creatures - park.active_visitors },
          () => ({
            entry_time: sql<Date>`NOW()`,
            exit_time: sql<Date>`NOW() + INTERVAL 4 HOUR`,
            park_id: park.id,
            visitor_id: getRandomVisitor(park.id),
          }),
        );

        return {
          park_id: park.id,
          visitors,
        };
      });

    console.log('dataVisitorsToInsertByGroup', dataVisitorsToInsertByGroup);

    // Map to easier acces
    const entryPriceMap = new Map(
      parkZoneVisitor.map((visitor) => [
        visitor.visitor_id,
        visitor.entry_price,
      ]),
    );

    //Generate table parkid, sumEntryPrice
    const entryPriceToAdd = dataVisitorsToInsertByGroup.map((group) => {
      // Group visitor by id and count
      const visitorCountById = group.visitors.reduce<Record<number, number>>(
        (acc, visitor) => {
          acc[visitor.visitor_id] = (acc[visitor.visitor_id] || 0) + 1;
          return acc;
        },
        {},
      );

      // recover the price and multiply
      const moneyToAdd = Object.entries(visitorCountById)
        .map(([visitor, count]) => {
          const price = entryPriceMap.get(Number(visitor)) ?? 0;
          return price * count;
        })
        .reduce((sum, val) => sum + val, 0);

      //final result
      return {
        park_id: group.park_id,
        moneyToAdd,
      };
    });

    //------------------------------------------------
    //--------ADD NEW VISITOR AND ENTRY PRICE---------
    //------------------------------------------------
    if (parkIdsCanAcceptVisitors.length > 0) {
      await Promise.all([
        //1- insert visitor
        db
          .insertInto('park_visitors')
          .values(
            dataVisitorsToInsertByGroup.flatMap((group) => group.visitors),
          )
          .execute(),

        //2- update wallet
        ...entryPriceToAdd.map(({ park_id, moneyToAdd }) =>
          db
            .updateTable('parks')
            .set({
              wallet: sql`wallet + ${moneyToAdd}`,
            })
            .where('id', '=', park_id)
            .execute(),
        ),
      ]);
    }

    //-----------------------------------------------------
    //---------ADD PROFIT IF CREATURE ACTIVE---------------
    //-----------------------------------------------------

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
