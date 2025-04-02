import { type Kysely, sql } from 'kysely';

import type { DB } from '@app/shared';

export async function up(db: Kysely<DB>): Promise<void> {
  // Migration code that update the database to the desired state.

  await db.transaction().execute(async (trx) => {
    await sql`
        CREATE TABLE avatar_list (
          id INT AUTO_INCREMENT PRIMARY KEY,
          src_image VARCHAR(100) NOT NULL
        );
      `.execute(trx);

    await sql`
      CREATE TABLE user (
        id INT AUTO_INCREMENT PRIMARY KEY,
        username VARCHAR(50) NOT NULL,
        email VARCHAR(100) NOT NULL UNIQUE,
        password_hash VARCHAR(255) NOT NULL,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        src_image VARCHAR(100),
        avatar_id INT, 
        CONSTRAINT fk_avatar FOREIGN KEY (avatar_id) REFERENCES avatar_list(id)
      );
    `.execute(trx);

    await sql`
      CREATE TABLE park (
        id INT AUTO_INCREMENT PRIMARY KEY,
        user_id INT NOT NULL,
        park_name VARCHAR(50) NOT NULL,
        wallet INT NOT NULL,
        entry_price INT NOT NULL,
        CONSTRAINT fk_user FOREIGN KEY (user_id) REFERENCES user(id)
      );
    `.execute(trx);

    await sql`
      CREATE TABLE gift (
        id INT AUTO_INCREMENT PRIMARY KEY,
        type VARCHAR(50) NOT NULL,
        gift_date TIMESTAMP,
        value VARCHAR(50) NOT NULL,
        park_id INT,
        CONSTRAINT fk_park FOREIGN KEY (park_id) REFERENCES park(id)
      );
    `.execute(trx);

    await sql`
      CREATE TABLE zones_list (
      id INT AUTO_INCREMENT PRIMARY KEY,
      name VARCHAR(50) NOT NULL,
      unlock_cost INT,
      src_image VARCHAR(100)
    );
    `.execute(trx);

    await sql`
      CREATE TABLE zone (
        id INT AUTO_INCREMENT PRIMARY KEY,
        park_id INT,
        zone_list_id INT,
        CONSTRAINT fk_park FOREIGN KEY (park_id) REFERENCES park(id),
        CONSTRAINT fk_zone_list FOREIGN KEY (zone_list_id) REFERENCES zones_list(id)
      );
    `.execute(trx);

    await sql`
      CREATE TABLE creatures_list (
        id INT AUTO_INCREMENT PRIMARY KEY,
        species VARCHAR(50) NOT NULL,
        feed_timer TIMESTAMP,
        price INT NOT NULL,
        unlock_cost INT,
        adult_date TIMESTAMP,
        src_image VARCHAR(100),
        src_background VARCHAR(100),
        zone_list_id INT,
        CONSTRAINT fk_zone_list FOREIGN KEY (zone_list_id) REFERENCES zones_list(id)
      );
    `.execute(trx);

    await sql`
      CREATE TABLE creatures (
        id INT AUTO_INCREMENT PRIMARY KEY,
        name VARCHAR(50),
        gender ENUM('male','female'),
        is_adult BOOLEAN,
        is_parent BOOLEAN,
        is_active BOOLEAN DEFAULT true,
        feed_date TIMESTAMP,
        adult_date TIMESTAMP,
        park_id INT, 
        creature_list_id INT,
        CONSTRAINT fk_park FOREIGN KEY (park_id) REFERENCES park(id),
        CONSTRAINT fk_creature_list FOREIGN KEY (creature_list_id) REFERENCES creatures_list(id)
      );
    `.execute(trx);

    await sql`
      CREATE TABLE visitors_list (
        id INT AUTO_INCREMENT PRIMARY KEY,
        category VARCHAR(50) NOT NULL,
        spending INT NOT NULL,
        spending_time INT NOT NULL,
        unlock_cost INT,
        src_image VARCHAR(100),
        zone_list_id INT,
        CONSTRAINT fk_zone_list FOREIGN KEY (zone_list_id) REFERENCES zones_list(id)
      );
    `.execute(trx);

    await sql`
      CREATE TABLE visitors (
        id INT AUTO_INCREMENT PRIMARY KEY,
        entry_time TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        exit_time TIMESTAMP,
        park_id INT,
        visitor_list_id INT,
        CONSTRAINT fk_park FOREIGN KEY (park_id) REFERENCES park(id),
        CONSTRAINT fk_visitor_list FOREIGN KEY (visitor_list_id) REFERENCES visitors_list(id)
      );
    `.execute(trx);

    await sql`
      CREATE TABLE decorations_list (
        id INT AUTO_INCREMENT PRIMARY KEY,
        name VARCHAR(50) NOT NULL,
        price INT,
        src_image VARCHAR(100),
        zone_list_id INT,
        CONSTRAINT fk_zone_list FOREIGN KEY (zone_list_id) REFERENCES zones_list(id)
      );
    `.execute(trx);

    await sql`
      CREATE TABLE decorations (
        id INT AUTO_INCREMENT PRIMARY KEY,
        park_id INT,
        deco_list_id INT,
        CONSTRAINT fk_park FOREIGN KEY (park_id) REFERENCES park(id),
        CONSTRAINT fk_deco_list FOREIGN KEY (deco_list_id) REFERENCES decorations_list(id)
      );
    `.execute(trx);

    await sql`
      CREATE TABLE potion_list (
        id INT AUTO_INCREMENT PRIMARY KEY,
        name VARCHAR(50),
        price INT,
        src_image VARCHAR(100),
        zone_list_id INT,
        CONSTRAINT fk_zone_list FOREIGN KEY (zone_list_id) REFERENCES zones_list(id)
      );
    `.execute(trx);
  });
}

export async function down(db: Kysely<DB>): Promise<void> {
  // Migration code that reverts the database to the previous state.
  await db.transaction().execute(async (trx) => {
    await sql`
      DROP TABLE IF EXISTS potion_list;
    `.execute(trx);

    await sql`
      DROP TABLE IF EXISTS decorations;
    `.execute(trx);

    await sql`
      DROP TABLE IF EXISTS decorations_list;
    `.execute(trx);

    await sql`
      DROP TABLE IF EXISTS visitors;
    `.execute(trx);

    await sql`
      DROP TABLE IF EXISTS visitors_list;
    `.execute(trx);

    await sql`
      DROP TABLE IF EXISTS creatures;
    `.execute(trx);

    await sql`
      DROP TABLE IF EXISTS creatures_list;
    `.execute(trx);

    await sql`
      DROP IF EXISTS TABLE zone;
    `.execute(trx);

    await sql`
      DROP TABLE IF EXISTS zones_list;
    `.execute(trx);

    await sql`
      DROP IF EXISTS TABLE gift;
    `.execute(trx);

    await sql`
      DROP IF EXISTS TABLE park;
    `.execute(trx);

    await sql`
      DROP IF EXISTS TABLE user;
    `.execute(trx);

    await sql`
      DROP TABLE IF EXISTS avatar_list;
    `.execute(trx);
  });
}
