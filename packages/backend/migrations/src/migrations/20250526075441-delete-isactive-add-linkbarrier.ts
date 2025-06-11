import { type Kysely, sql } from 'kysely';

import type { DB } from '@app/shared';

export async function up(db: Kysely<DB>): Promise<void> {
  // Migration code that update the database to the desired state.
  await db.transaction().execute(async (trx) => {
    await sql`
      ALTER TABLE park_creatures
      DROP COLUMN is_active;
    `.execute(trx);

    await sql`
      ALTER TABLE barriers
      ADD COLUMN link_world VARCHAR(50);
    `.execute(trx);

    await sql`
      ALTER TABLE zones
      DROP COLUMN unlock_cost;
    `.execute(trx);
  });
}

export async function down(db: Kysely<DB>): Promise<void> {
  // Migration code that reverts the database to the previous state.
  await db.transaction().execute(async (trx) => {
    await sql`
      ALTER TABLE zones
      ADD COLUMN unlock_cost INT;
    `.execute(trx);

    await sql`
      ALTER TABLE barriers
      DROP COLUMN link_world;
    `.execute(trx);

    await sql`
      ALTER TABLE park_creatures
      ADD COLUMN is_active BOOLEAN DEFAULT true;
    `.execute(trx);
  });
}
