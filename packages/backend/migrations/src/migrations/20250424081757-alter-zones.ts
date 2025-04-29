import { type Kysely, sql } from 'kysely';

import type { DB } from '@app/shared';

export async function up(db: Kysely<DB>): Promise<void> {
  // Migration code that update the database to the desired state.
  await db.transaction().execute(async (trx) => {
    await sql`
      ALTER TABLE zones
      ADD COLUMN link VARCHAR(255) NOT NULL;
    `.execute(trx);

    await sql`
      ALTER TABLE zones
      MODIFY src_image VARCHAR(255) NOT NULL;
    `.execute(trx);

    await sql`
      ALTER TABLE decorations
      ADD COLUMN position VARCHAR(50);
    `.execute(trx);

    await sql`
      ALTER TABLE decorations
      ADD COLUMN direction VARCHAR(50);
    `.execute(trx);
  });
}

export async function down(db: Kysely<DB>): Promise<void> {
  // Migration code that reverts the database to the previous state.
  await db.transaction().execute(async (trx) => {
    await sql`
      ALTER TABLE decorations
      DROP COLUMN direction;
    `.execute(trx);

    await sql`
      ALTER TABLE decorations
      DROP COLUMN position;
    `.execute(trx);

    await sql`
      ALTER TABLE zones
      MODIFY src_image VARCHAR(100);
    `.execute(trx);

    await sql`
      ALTER TABLE zones
      DROP COLUMN link;
    `.execute(trx);
  });
}
