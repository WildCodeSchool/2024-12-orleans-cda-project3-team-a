import { type Kysely, sql } from 'kysely';

import type { DB } from '@app/shared';

export async function up(db: Kysely<DB>): Promise<void> {
  // Migration code that update the database to the desired state.
  await db.transaction().execute(async (trx) => {
    await sql`
ALTER TABLE creatures 
ADD COLUMN background VARCHAR(50) NOT NULL;
`.execute(trx);

    await sql`
ALTER TABLE decorations
RENAME TO barriers;
`.execute(trx);

    await sql`
ALTER TABLE barriers
MODIFY price BIGINT NOT NULL ;
`.execute(trx);

    await sql`
ALTER TABLE park_decorations 
RENAME TO park_barriers;
`.execute(trx);

    await sql` 
ALTER TABLE park_barriers
RENAME COLUMN deco_id TO barrier_id;
`.execute(trx);

    await sql` 
CREATE TABLE decorations(
id INT AUTO_INCREMENT PRIMARY KEY,
name VARCHAR(150) NOT NULL,
src_image VARCHAR(250) NOT NULL,
creature_id INT NOT NULL,
position VARCHAR(150) NOT NULL,
CONSTRAINT fk_decorations_creature_id FOREIGN KEY (creature_id) REFERENCES creatures(id)
);
`.execute(trx);

    await sql`
ALTER TABLE zones
ADD COLUMN src_sign VARCHAR(50) NOT NULL;
`.execute(trx);
  });
}

export async function down(db: Kysely<DB>): Promise<void> {
  // Migration code that reverts the database to the previous state.
  await db.transaction().execute(async (trx) => {
    await sql`
ALTER TABLE zones
DROP COLUMN src_sign
`.execute(trx);

    await sql` 
    DROP TABLE decorations
    `.execute(trx);

    await sql`
    ALTER TABLE park_barriers
    RENAME COLUMN barrier_id TO deco_id
    `.execute(trx);

    await sql`
    ALTER TABLE park_barriers
    RENAME TO park_decorations
    `.execute(trx);

    await sql`
      ALTER TABLE barriers
      MODIFY price INT NOT NULL
      `.execute(trx);

    await sql`
    ALTER TABLE barriers
    RENAME TO decorations
    `.execute(trx);

    await sql`
    ALTER TABLE creatures
    DROP COLUMN background
    `.execute(trx);
  });
}
