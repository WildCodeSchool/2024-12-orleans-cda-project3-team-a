import { type Kysely, sql } from 'kysely';

import type { DB } from '@app/shared';

export async function up(db: Kysely<DB>): Promise<void> {
  // Migration code that update the database to the desired state.
  await db.transaction().execute(async (trx) => {
    await sql`
      ALTER TABLE park_visitors
      MODIFY entry_time TIMESTAMP NOT NULL,
      MODIFY exit_time TIMESTAMP NOT NULL;
    `.execute(trx);

    await sql`
      ALTER TABLE visitors
      RENAME COLUMN spending TO entry_price;
    `.execute(trx);

    await sql`
      ALTER TABLE parks
      DROP COLUMN entry_price;
    `.execute(trx);
  });
}

export async function down(db: Kysely<DB>): Promise<void> {
  // Migration code that reverts the database to the previous state.
  await db.transaction().execute(async (trx) => {
    await sql`
      ALTER TABLE parks
      ADD COLUMN entry_price INT NOT NULL;
    `.execute(trx);

    await sql`
      ALTER TABLE visitors
      RENAME COLUMN entry_price TO spending;
    `.execute(trx);

    await sql`
      ALTER TABLE park_visitors
      MODIFY exit_time TIMESTAMP NULL,
      MODIFY entry_time TIMESTAMP NULL;
    `.execute(trx);
  });
}
