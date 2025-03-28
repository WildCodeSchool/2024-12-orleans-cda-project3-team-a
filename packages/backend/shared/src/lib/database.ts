import { Kysely, MysqlDialect, sql } from 'kysely';
import { createPool } from 'mysql2';

import { type DB, env } from '@app/shared';

env();

const { DB_HOST, DB_PORT, DB_USER, DB_PASS, DB_NAME } = process.env;

if (DB_HOST === undefined) throw new Error('DB_HOST is not defined');
if (DB_PORT === undefined) throw new Error('DB_PORT is not defined');
if (DB_USER === undefined) throw new Error('DB_USER is not defined');
if (DB_PASS === undefined) throw new Error('DB_PASS is not defined');
if (DB_NAME === undefined) throw new Error('DB_NAME is not defined');

const dialect = new MysqlDialect({
  pool: createPool({
    database: DB_NAME,
    host: DB_HOST,
    user: DB_USER,
    password: DB_PASS,
    port: +DB_PORT,
    connectionLimit: 10,
  }),
});

export const db = new Kysely<DB>({
  dialect,
});

try {
  await sql`SELECT 1;`.execute(db);
  // eslint-disable-next-line no-console
  console.log('Connected to db!');
} catch (error) {
  if (error instanceof Error) {
    // eslint-disable-next-line no-console
    console.error(
      `Failed to connect to database using "${DB_HOST}:${DB_PORT}" (${error.message})`,
    );
  } else {
    // eslint-disable-next-line no-console
    console.error('Failed to connect to database', error);
  }
}
