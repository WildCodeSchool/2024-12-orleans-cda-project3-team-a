import { CronJob } from 'cron';
import { sql } from 'kysely';
import { log } from 'node:console';

import { db } from '@app/backend-shared';

//reste à gérer les zones

new CronJob(
  '* * * * * ', // cronTime each minute
  // '* * * * * *',

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
      .groupBy('parks.id')
      .execute();

    // console.log('park creature', parkCreaturesVisitors);

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

    //recover the table of zones unlock by park
    const parkZonesUnlocked = await db
      .selectFrom('park_zones')
      .select(['park_id', 'zone_id'])
      .execute();

    //group by parkid
    const zonesByParkId = parkZonesUnlocked.reduce<Record<number, number[]>>(
      (acc, parkZone) => {
        acc[parkZone.park_id].push(parkZone.zone_id);
        return acc;
      },
      {},
    );

    //function to use to generate a visitor id random
    function getRandomZone(park_id: number): number | null {
      const zones = zonesByParkId[park_id];
      const randomIndex = Math.floor(Math.random() * zones.length);
      return zones[randomIndex];
    }

    const visitorIdZonesId = await db
      .selectFrom('visitors')
      .leftJoin('zones', 'zones.id', 'visitors.zone_id')
      .select(['visitors.id as visitorId', 'zones.id as zoneId'])
      .execute();

    // Map to easier acces
    const visitorIdZonesIdMap = new Map(
      visitorIdZonesId.map((visitor) => [visitor.visitorId, visitor.zoneId]),
    );

    //Generate table to add in the insert of park_visitors
    const dataVisitorsToInsertByGroup = parkCreaturesVisitors
      .filter((park) => park.nb_visitor_to_add > 0)
      .map((park) => {
        const visitors = Array.from({ length: park.nb_visitor_to_add }, () => ({
          // entry_time: sql`NOW()`,
          // exit_time: sql`NOW() + interval '4 hours'`,
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

    //logic to have table parkid sumEntryPrice
    const entryPriceByVisitorId = await db
      .selectFrom('visitors')
      .select(['entry_price', 'id'])
      .execute();

    // Map to easier acces
    const entryPriceMap = new Map(
      entryPriceByVisitorId.map((visitor) => [visitor.id, visitor.entry_price]),
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

        //2- update wallet
        entryPriceToAdd.map(({ park_id, moneyToAdd }) =>
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
