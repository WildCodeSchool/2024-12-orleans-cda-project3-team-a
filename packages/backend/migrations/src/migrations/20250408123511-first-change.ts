import { type Kysely, sql } from 'kysely';

import type { DB } from '@app/shared';

export async function up(db: Kysely<DB>): Promise<void> {
  // Migration code that update the database to the desired state.
  await db.transaction().execute(async (trx) => {
    await sql`
      ALTER TABLE users
      DROP COLUMN src_image;
    `.execute(trx);

    await sql`
      ALTER TABLE gifts
      DROP FOREIGN KEY fk_gifts_park_id;
    `.execute(trx);

    await sql`
      ALTER TABLE gifts
      ADD CONSTRAINT fk_park_gifts_park_id FOREIGN KEY (park_id) REFERENCES parks(id);
    `.execute(trx);

    await sql`
      ALTER TABLE gifts 
      RENAME TO park_gifts;
    `.execute(trx);

    await sql`
      ALTER TABLE creatures
      DROP COLUMN src_background;
    `.execute(trx);

    await sql`
      ALTER TABLE parks
      MODIFY wallet BIGINT
    `.execute(trx);
  });
}

export async function down(db: Kysely<DB>): Promise<void> {
  // Migration code that reverts the database to the previous state.
  await db.transaction().execute(async (trx) => {
    await sql`
      ALTER TABLE parks
      MODIFY wallet INT
    `.execute(trx);

    await sql`
      ALTER TABLE creatures
      ADD src_background VARCHAR(100);
      `.execute(trx);

    await sql`
      ALTER TABLE park_gifts 
      RENAME TO gifts
    `.execute(trx);

    await sql`
      ALTER TABLE gifts
      DROP FOREIGN KEY fk_park_gifts_park_id;
    `.execute(trx);

    await sql`
      ALTER TABLE gifts
      ADD CONSTRAINT fk_gifts_park_id FOREIGN KEY (park_id) REFERENCES parks(id);
    `.execute(trx);

    await sql`
      ALTER TABLE users
      ADD src_image VARCHAR(100);
    `.execute(trx);
  });
}
