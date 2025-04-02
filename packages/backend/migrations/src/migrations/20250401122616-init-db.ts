import { type Kysely, sql } from 'kysely';

import type { DB } from '@app/shared';

export async function up(db: Kysely<DB>): Promise<void> {
  // Migration code that update the database to the desired state.

  await db.transaction().execute(async (trx) => {
    await sql`
        CREATE TABLE avatars_list (
          id INT AUTO_INCREMENT PRIMARY KEY,
          src_image VARCHAR(100) NOT NULL
        );
      `.execute(trx);

    await sql`
      CREATE TABLE user (
        id INT AUTO_INCREMENT PRIMARY KEY,
        username VARCHAR(50) NOT NULL,
        email VARCHAR(255) NOT NULL UNIQUE,
        password_hash VARCHAR(255) NOT NULL,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        src_image VARCHAR(100),
        avatar_id INT, 
        CONSTRAINT fk_user_avatar_id FOREIGN KEY (avatar_id) REFERENCES avatars_list(id)
      );
    `.execute(trx);

    await sql`
      CREATE TABLE park (
        id INT AUTO_INCREMENT PRIMARY KEY,
        user_id INT NOT NULL,
        park_name VARCHAR(50) NOT NULL,
        wallet INT NOT NULL,
        entry_price INT NOT NULL,
        CONSTRAINT fk_park_user_id FOREIGN KEY (user_id) REFERENCES user(id)
      );
    `.execute(trx);

    await sql`
      CREATE TABLE gift (
        id INT AUTO_INCREMENT PRIMARY KEY,
        type VARCHAR(50) NOT NULL,
        gift_date TIMESTAMP,
        value VARCHAR(50) NOT NULL,
        park_id INT NOT NULL,
        CONSTRAINT fk_gift_park_id FOREIGN KEY (park_id) REFERENCES park(id)
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
        park_id INT NOT NULL,
        zones_list_id INT NOT NULL,
        CONSTRAINT fk_zone_park_id FOREIGN KEY (park_id) REFERENCES park(id),
        CONSTRAINT fk_zone_zones_list_id FOREIGN KEY (zones_list_id) REFERENCES zones_list(id)
      );
    `.execute(trx);

    await sql`
      CREATE TABLE creatures_list (
        id INT AUTO_INCREMENT PRIMARY KEY,
        species VARCHAR(50) NOT NULL,
        feed_timer INT,
        price INT NOT NULL,
        unlock_cost INT,
        src_image VARCHAR(100),
        src_background VARCHAR(100),
        zones_list_id INT NOT NULL,
        CONSTRAINT fk_creatures_list_zones_list_id FOREIGN KEY (zones_list_id) REFERENCES zones_list(id)
      );
    `.execute(trx);

    await sql`
      CREATE TABLE creature (
        id INT AUTO_INCREMENT PRIMARY KEY,
        name VARCHAR(50) NOT NULL,
        gender ENUM('male','female') NOT NULL,
        is_adult BOOLEAN NOT NULL,
        is_parent BOOLEAN NOT NULL,
        is_active BOOLEAN DEFAULT true,
        feed_date TIMESTAMP,
        adult_at TIMESTAMP NOT NULL,
        park_id INT NOT NULL, 
        creatures_list_id INT NOT NULL,
        CONSTRAINT fk_creature_park_id FOREIGN KEY (park_id) REFERENCES park(id),
        CONSTRAINT fk_creature_creatures_list_id FOREIGN KEY (creatures_list_id) REFERENCES creatures_list(id)
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
        zones_list_id INT,
        CONSTRAINT fk_visitors_list_zones_list_id FOREIGN KEY (zones_list_id) REFERENCES zones_list(id)
      );
    `.execute(trx);

    await sql`
      CREATE TABLE visitor (
        id INT AUTO_INCREMENT PRIMARY KEY,
        entry_time TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        exit_time TIMESTAMP,
        park_id INT NOT NULL,
        visitors_list_id INT NOT NULL,
        CONSTRAINT fk_visitor_park_id FOREIGN KEY (park_id) REFERENCES park(id),
        CONSTRAINT fk_visitor_visitors_list_id FOREIGN KEY (visitors_list_id) REFERENCES visitors_list(id)
      );
    `.execute(trx);

    await sql`
      CREATE TABLE decorations_list (
        id INT AUTO_INCREMENT PRIMARY KEY,
        name VARCHAR(50) NOT NULL,
        price INT,
        src_image VARCHAR(100),
        zones_list_id INT NOT NULL,
        CONSTRAINT fk_decorations_list_zones_list_id FOREIGN KEY (zones_list_id) REFERENCES zones_list(id)
      );
    `.execute(trx);

    await sql`
      CREATE TABLE decoration (
        id INT AUTO_INCREMENT PRIMARY KEY,
        park_id INT NOT NULL,
        deco_list_id INT NOT NULL,
        CONSTRAINT fk_decoration_park_id FOREIGN KEY (park_id) REFERENCES park(id),
        CONSTRAINT fk_decoration_deco_list_id FOREIGN KEY (deco_list_id) REFERENCES decorations_list(id)
      );
    `.execute(trx);

    await sql`
      CREATE TABLE potions_list (
        id INT AUTO_INCREMENT PRIMARY KEY,
        name VARCHAR(50) NOT NULL,
        price INT,
        src_image VARCHAR(100),
        zones_list_id INT NOT NULL,
        CONSTRAINT fk_potions_list_zones_list_id FOREIGN KEY (zones_list_id) REFERENCES zones_list(id)
      );
    `.execute(trx);
  });
}

export async function down(db: Kysely<DB>): Promise<void> {
  // Migration code that reverts the database to the previous state.
  await db.transaction().execute(async (trx) => {
    await sql`
      DROP TABLE IF EXISTS potions_list;
    `.execute(trx);

    await sql`
      DROP TABLE IF EXISTS decoration;
    `.execute(trx);

    await sql`
      DROP TABLE IF EXISTS decorations_list;
    `.execute(trx);

    await sql`
      DROP TABLE IF EXISTS visitor;
    `.execute(trx);

    await sql`
      DROP TABLE IF EXISTS visitors_list;
    `.execute(trx);

    await sql`
      DROP TABLE IF EXISTS creature;
    `.execute(trx);

    await sql`
      DROP TABLE IF EXISTS creatures_list;
    `.execute(trx);

    await sql`
      DROP TABLE IF EXISTS zone;
    `.execute(trx);

    await sql`
      DROP TABLE IF EXISTS zones_list;
    `.execute(trx);

    await sql`
      DROP TABLE IF EXISTS gift;
    `.execute(trx);

    await sql`
      DROP TABLE IF EXISTS park;
    `.execute(trx);

    await sql`
      DROP TABLE IF EXISTS user;
    `.execute(trx);

    await sql`
      DROP TABLE IF EXISTS avatars_list;
    `.execute(trx);
  });
}
