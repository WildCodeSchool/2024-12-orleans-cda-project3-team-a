import { CronJob } from 'cron';
import crypto from 'crypto';
import { sql } from 'kysely';
import type { NotNull } from 'kysely';

import { db } from '@app/backend-shared';

new CronJob(
  '* * * * *', // cronTime each minute

  async function () {
    const randomSteven = crypto.randomBytes(16).toString('hex');
    console.log('start cron', randomSteven, new Date());

    const now = new Date();

    //recovers count visitor and creatures active
    const parkCreaturesVisitors = await db
      .selectFrom('parks')
      .select(({ eb }) => [
        'parks.id',
        // subquery to know active_creature
        eb
          .selectFrom('park_creatures')
          .select(({ fn }) => [fn.count<number>('id').as('active_creatures')])
          .whereRef('park_creatures.park_id', '=', 'parks.id')
          .where('park_creatures.feed_date', '>', now)
          .as('active_creatures'),
        // subquery to know active_visitors
        eb
          .selectFrom('park_visitors')
          .select(({ fn }) => [fn.count<number>('id').as('active_visitors')])
          .whereRef('park_visitors.park_id', '=', 'parks.id')
          .where('park_visitors.exit_time', '>', now)
          .as('active_visitors'),
        // subquery to know nb_zones_unlocked
        eb
          .selectFrom('park_zones')
          .select(({ fn }) => [fn.count<number>('id').as('nb_zones_unlocked')])
          .whereRef('park_zones.park_id', '=', 'parks.id')
          .as('nb_zones_unlocked'),
        // subquery to know total_creatures
        eb
          .selectFrom('park_creatures')
          .select(({ fn }) => [fn.count<number>('id').as('total_creatures')])
          .whereRef('park_creatures.park_id', '=', 'parks.id')
          .as('total_creatures'),
        // subquery to know last feed creature
        eb
          .selectFrom('park_creatures')
          .select(({ fn }) => [fn.max('feed_date').as('last_hungry')])
          .whereRef('park_creatures.park_id', '=', 'parks.id')
          .as('last_hungry'),
      ])
      .$narrowType<{
        total_creatures: NotNull;
        last_hungry: NotNull;
        active_visitors: NotNull;
        active_creatures: NotNull;
      }>()
      .execute();

    // if no result stop the function
    if (parkCreaturesVisitors.length === 0) {
      return;
    }

    console.log(
      'parkCreaturesVisitors',
      new Date(),
      randomSteven,
      parkCreaturesVisitors,
    );

    //we add visitor in the park only when the last creature is not hungry more than 1 day and if active visitor < total creature
    const parkIdsCanAcceptVisitors = parkCreaturesVisitors
      .filter(
        (park) =>
          park.last_hungry > new Date(Date.now() - 1 * 24 * 60 * 60 * 1000) &&
          park.total_creatures > park.active_visitors,
      )
      .map((park) => park.id);

    console.log(
      'parkIdsCanAcceptVisitors',
      new Date(),
      randomSteven,
      parkIdsCanAcceptVisitors,
    );

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

    console.log('parkZoneVisitor', new Date(), randomSteven, parkZoneVisitor);

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

    console.log(
      'dataVisitorsToInsertByGroup',
      new Date(),
      randomSteven,
      dataVisitorsToInsertByGroup,
    );

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
    console.log(
      'start request for update park_visitors',
      randomSteven,
      new Date(),
    );
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
    console.log(
      'END request for update park_visitors',
      randomSteven,
      new Date(),
    );

    //-----------------------------------------------------
    //---------ADD PROFIT IF CREATURE ACTIVE---------------
    //-----------------------------------------------------

    //recover park where we have to add a profit time
    const parkIdsCreaturesActive = parkCreaturesVisitors
      .filter((park) => park.active_creatures > 0)
      .map((park) => park.id);

    console.log(
      'start request for update parks with creature profit',
      randomSteven,
      new Date(),
    );
    if (parkIdsCreaturesActive.length > 0) {
      //update wallet with visitors who spending money each money according to the number creature active
      await db
        .updateTable('parks')
        .set({
          //we sum the number of creature active and multiply by his profit
          wallet: sql`
        parks.wallet + COALESCE(
        (SELECT SUM(profit)
        FROM park_creatures 
        JOIN creatures ON creature_id = creatures.id
        WHERE feed_date > NOW()
        AND park_id = parks.id)
          , 0)
      `,
        })
        //we add the entry price especially for parks with outgoing visitors, avoid to add + 0
        .where('parks.id', 'in', parkIdsCreaturesActive)
        .execute();
    }

    console.log(
      'END request for update parks with creature profit',
      randomSteven,
      new Date(),
    );

    console.log('end cron', randomSteven, new Date());
  },
  null, // onComplete
  true, // start
  'Europe/Paris', // timeZone
);
