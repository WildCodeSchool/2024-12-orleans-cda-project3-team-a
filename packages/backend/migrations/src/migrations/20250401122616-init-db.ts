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
        created_at TIMESTAMP,
        src_image VARCHAR(100),
        CONSTRAINT avatar_id FOREIGN KEY REFERENCES avatar_list(id)
      );
    `.execute(trx);

    await sql`
      CREATE TABLE park (
        id INT AUTO_INCREMENT PRIMARY KEY,
        user_id INT NOT NULL,
        park_name VARCHAR(50) NOT NULL,
        wallet INT NOT NULL,
        entry_price INT NOT NULL,
        CONSTRAINT user_id FOREIGN KEY REFERENCES user(id)
      );
    `.execute(trx);

    await sql`
      CREATE TABLE gift (
        id INT AUTO_INCREMENT PRIMARY KEY,
        type VARCHAR(50) NOT NULL,
        gift_date TIMESTAMP,
        value VARCHAR(50) NOT NULL,
        CONSTRAINT park_id FOREIGN KEY REFERENCES park(id)
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
        CONSTRAINT park_id FOREIGN KEY REFERENCES park(id),
        CONSTRAINT zone_list_id FOREIGN KEY REFERENCES zones_list(id)
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
        CONSTRAINT zones_list_id FOREIGN KEY REFERENCES zones_list(id)
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
        CONSTRAINT park_id FOREIGN KEY REFERENCES park(id),
        CONSTRAINT creature_list_id FOREIGN KEY REFERENCES creatures_list(id)
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
        CONSTRAINT zones_list_id FOREIGN KEY REFERENCES zones_list(id)
      );
    `.execute(trx);

    await sql`
      CREATE TABLE visitors (
        id INT AUTO_INCREMENT PRIMARY KEY,
        entry_time TIMESTAMP,
        exit_time TIMESTAMP,
        CONSTRAINT park_id FOREIGN KEY REFERENCES park(id),
        CONSTRAINT visitors_list_id FOREIGN KEY REFERENCES visitors_list(id)
      );
    `.execute(trx);

    await sql`
      CREATE TABLE decorations_list (
        id INT AUTO_INCREMENT PRIMARY KEY,
        name VARCHAR(50) NOT NULL,
        price INT,
        src_image VARCHAR(100),
        CONSTRAINT zones_list_id FOREIGN KEY REFERENCES zones_list(id)
      );
    `.execute(trx);

    await sql`
      CREATE TABLE decorations (
        id INT AUTO_INCREMENT PRIMARY KEY,
        CONSTRAINT park_id FOREIGN KEY REFERENCES park(id),
        CONSTRAINT deco_list_id FOREIGN KEY REFERENCES decorations_lits(id)
      );
    `.execute(trx);

    await sql`
      CREATE TABLE potion_list (
        id INT AUTO_INCREMENT PRIMARY KEY,
        name VARCHAR(50),
        price INT,
        src_image VARCHAR(100),
        CONSTRAINT zones_list_id FOREIGN KEY REFERENCES zones_list(id)
      );
    `.execute(trx);
  });
}

export async function down(db: Kysely<DB>): Promise<void> {
  // Migration code that reverts the database to the previous state.
  await db.transaction().execute(async (trx) => {
    await sql`
      DROP TABLE potion_list IF EXISTS;
    `.execute(trx);

    await sql`
      DROP TABLE decorations IF EXISTS;
    `.execute(trx);

    await sql`
      DROP TABLE decorations_list IF EXISTS;
    `.execute(trx);

    await sql`
      DROP TABLE visitors IF EXISTS;
    `.execute(trx);

    await sql`
      DROP TABLE visitors_list IF EXISTS;
    `.execute(trx);

    await sql`
      DROP TABLE creatures IF EXISTS;
    `.execute(trx);

    await sql`
      DROP TABLE creatures_list IF EXISTS;
    `.execute(trx);

    await sql`
      DROP TABLE zone IF EXISTS;
    `.execute(trx);

    await sql`
      DROP TABLE zones_list IF EXISTS;
    `.execute(trx);

    await sql`
      DROP TABLE gift IF EXISTS;
    `.execute(trx);

    await sql`
      DROP TABLE park IF EXISTS;
    `.execute(trx);

    await sql`
      DROP TABLE user IF EXISTS;
    `.execute(trx);

    await sql`
      DROP TABLE avatar_list IF EXISTS;
    `.execute(trx);
  });
}
