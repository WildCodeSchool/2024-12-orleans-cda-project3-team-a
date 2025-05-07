// file format is YYYYMMDDHHMM-<name>.ts
import type { Kysely } from 'kysely';

import type { DB } from '@app/shared';

export async function up(db: Kysely<DB>): Promise<void> {
  // Migration code that update the database to the desired state.
  await db.transaction().execute(async (trx) => {
    await trx.schema
      .createTable('item')
      .addColumn('id', 'int8', (col) => col.autoIncrement().primaryKey())
      .addColumn('content', 'text', (col) => col.notNull())
      .execute();
  });
}

export async function down(db: Kysely<DB>): Promise<void> {
  // Migration code that reverts the database to the previous state.
  await db.transaction().execute(async (trx) => {
    await trx.schema.dropTable('item').ifExists().execute();
  });
}
