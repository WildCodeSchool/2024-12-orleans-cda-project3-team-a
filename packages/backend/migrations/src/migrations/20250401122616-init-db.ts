import { type Kysely, sql } from 'kysely';

import type { DB } from '@app/shared';

export async function up(db: Kysely<DB>): Promise<void> {
  // Migration code that update the database to the desired state.

  await db.transaction().execute(async (trx) => {
    await sql`
        CREATE TABLE avatars (
          id INT AUTO_INCREMENT PRIMARY KEY,
          src_image VARCHAR(100) NOT NULL
        );
      `.execute(trx);

    await sql`
      CREATE TABLE users (
        id INT AUTO_INCREMENT PRIMARY KEY,
        username VARCHAR(50) NOT NULL,
        email VARCHAR(255) NOT NULL UNIQUE,
        password_hash VARCHAR(255) NOT NULL,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        src_image VARCHAR(100),
        avatar_id INT, 
        CONSTRAINT fk_users_avatar_id FOREIGN KEY (avatar_id) REFERENCES avatars(id)
      );
    `.execute(trx);

    await sql`
      CREATE TABLE parks (
        id INT AUTO_INCREMENT PRIMARY KEY,
        user_id INT NOT NULL,
        park_name VARCHAR(50) NOT NULL,
        wallet INT NOT NULL,
        entry_price INT NOT NULL,
        CONSTRAINT fk_parks_user_id FOREIGN KEY (user_id) REFERENCES users(id)
      );
    `.execute(trx);

    await sql`
      CREATE TABLE gifts (
        id INT AUTO_INCREMENT PRIMARY KEY,
        type VARCHAR(50) NOT NULL,
        gift_date TIMESTAMP,
        value VARCHAR(50) NOT NULL,
        park_id INT NOT NULL,
        CONSTRAINT fk_gifts_park_id FOREIGN KEY (park_id) REFERENCES parks(id)
      );
    `.execute(trx);

    await sql`
      CREATE TABLE zones (
      id INT AUTO_INCREMENT PRIMARY KEY,
      name VARCHAR(50) NOT NULL,
      unlock_cost INT,
      src_image VARCHAR(100)
    );
    `.execute(trx);

    await sql`
      CREATE TABLE park_zones (
        id INT AUTO_INCREMENT PRIMARY KEY,
        park_id INT NOT NULL,
        zones_id INT NOT NULL,
        CONSTRAINT fk_park_zones_park_id FOREIGN KEY (park_id) REFERENCES parks(id),
        CONSTRAINT fk_park_zones_zones_id FOREIGN KEY (zones_id) REFERENCES zones(id)
      );
    `.execute(trx);

    await sql`
      CREATE TABLE creatures (
        id INT AUTO_INCREMENT PRIMARY KEY,
        species VARCHAR(50) NOT NULL,
        feed_timer INT,
        price INT NOT NULL,
        unlock_cost INT,
        src_image VARCHAR(100),
        src_background VARCHAR(100),
        zones_id INT NOT NULL,
        CONSTRAINT fk_creatures_zones_id FOREIGN KEY (zones_id) REFERENCES zones(id)
      );
    `.execute(trx);

    await sql`
      CREATE TABLE park_creatures (
        id INT AUTO_INCREMENT PRIMARY KEY,
        name VARCHAR(50) NOT NULL,
        gender ENUM('male','female') NOT NULL,
        is_adult BOOLEAN NOT NULL,
        is_parent BOOLEAN NOT NULL,
        is_active BOOLEAN DEFAULT true,
        feed_date TIMESTAMP,
        adult_at TIMESTAMP NOT NULL,
        park_id INT NOT NULL, 
        creatures_id INT NOT NULL,
        CONSTRAINT fk_park_creatures_park_id FOREIGN KEY (park_id) REFERENCES parks(id),
        CONSTRAINT fk_park_creatures_creatures_id FOREIGN KEY (creatures_id) REFERENCES creatures(id)
      );
    `.execute(trx);

    await sql`
      CREATE TABLE visitors (
        id INT AUTO_INCREMENT PRIMARY KEY,
        category VARCHAR(50) NOT NULL,
        spending INT NOT NULL,
        spending_time INT NOT NULL,
        unlock_cost INT,
        src_image VARCHAR(100),
        zones_id INT,
        CONSTRAINT fk_visitors_zones_id FOREIGN KEY (zones_id) REFERENCES zones(id)
      );
    `.execute(trx);

    await sql`
      CREATE TABLE park_visitors (
        id INT AUTO_INCREMENT PRIMARY KEY,
        entry_time TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        exit_time TIMESTAMP,
        park_id INT NOT NULL,
        visitors_id INT NOT NULL,
        CONSTRAINT fk_park_visitors_park_id FOREIGN KEY (park_id) REFERENCES parks(id),
        CONSTRAINT fk_park_visitors_visitors_id FOREIGN KEY (visitors_id) REFERENCES visitors(id)
      );
    `.execute(trx);

    await sql`
      CREATE TABLE decorations (
        id INT AUTO_INCREMENT PRIMARY KEY,
        name VARCHAR(50) NOT NULL,
        price INT,
        src_image VARCHAR(100),
        zones_id INT NOT NULL,
        CONSTRAINT fk_decorations_zones_id FOREIGN KEY (zones_id) REFERENCES zones(id)
      );
    `.execute(trx);

    await sql`
      CREATE TABLE park_decorations (
        id INT AUTO_INCREMENT PRIMARY KEY,
        park_id INT NOT NULL,
        deco_id INT NOT NULL,
        CONSTRAINT fk_park_decorations_park_id FOREIGN KEY (park_id) REFERENCES parks(id),
        CONSTRAINT fk_park_decorations_deco_id FOREIGN KEY (deco_id) REFERENCES decorations(id)
      );
    `.execute(trx);

    await sql`
      CREATE TABLE potions (
        id INT AUTO_INCREMENT PRIMARY KEY,
        name VARCHAR(50) NOT NULL,
        price INT,
        src_image VARCHAR(100),
        zones_id INT NOT NULL,
        CONSTRAINT fk_potions_zones_id FOREIGN KEY (zones_id) REFERENCES zones(id)
      );
    `.execute(trx);
  });
}

export async function down(db: Kysely<DB>): Promise<void> {
  // Migration code that reverts the database to the previous state.
  await db.transaction().execute(async (trx) => {
    await sql`
      DROP TABLE IF EXISTS potions;
    `.execute(trx);

    await sql`
      DROP TABLE IF EXISTS park_decorations;
    `.execute(trx);

    await sql`
      DROP TABLE IF EXISTS decorations;
    `.execute(trx);

    await sql`
      DROP TABLE IF EXISTS park_visitors;
    `.execute(trx);

    await sql`
      DROP TABLE IF EXISTS visitors;
    `.execute(trx);

    await sql`
      DROP TABLE IF EXISTS park_creatures;
    `.execute(trx);

    await sql`
      DROP TABLE IF EXISTS creatures;
    `.execute(trx);

    await sql`
      DROP TABLE IF EXISTS park_zones;
    `.execute(trx);

    await sql`
      DROP TABLE IF EXISTS zones;
    `.execute(trx);

    await sql`
      DROP TABLE IF EXISTS gifts;
    `.execute(trx);

    await sql`
      DROP TABLE IF EXISTS parks;
    `.execute(trx);

    await sql`
      DROP TABLE IF EXISTS users;
    `.execute(trx);

    await sql`
      DROP TABLE IF EXISTS avatars;
    `.execute(trx);
  });
}
