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
  });
}

export async function down(db: Kysely<DB>): Promise<void> {
  // Migration code that reverts the database to the previous state.
  await db.transaction().execute(async (trx) => {
    await sql`
      ALTER TABLE park_visitors
      MODIFY exit_time TIMESTAMP NULL,
      MODIFY entry_time TIMESTAMP NULL;
    `.execute(trx);
  });
}
