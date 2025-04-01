import { type Kysely, sql } from 'kysely';

import type { DB } from '@app/shared';

export async function up(db: Kysely<DB>): Promise<void> {
  // Migration code that update the database to the desired state.

  await db.transaction().execute(async (trx) => {
    await sql`
        CREATE TABLE avatar_list (
          id int AUTO_INCREMENT PRIMARY KEY,
          src_image VARCHAR(50) NOT NULL
        );
      `.execute(trx);

    await sql`
      CREATE TABLE user (
        id int AUTO_INCREMENT PRIMARY KEY,
        username VARCHAR(50) NOT NULL,
        email VARCHAR(100) NOT NULL UNIQUE,
        password_hash VARCHAR(255) NOT NULL,
        created_at TIMESTAMP,
        src_image VARCHAR(50),
        CONSTRAINT avatar_id FOREIGN KEY REFERENCES avatar_list (id)
      );
    `.execute(trx);
  });
}

export async function down(db: Kysely<DB>): Promise<void> {
  // Migration code that reverts the database to the previous state.
  await db.transaction().execute(async (trx) => {
    await sql`
      DROP TABLE avatar_list IF EXISTS;
    `.execute(trx);

    await sql`
      DROP TABLE user IF EXISTS;
    `.execute(trx);
  });
}
