/* eslint-disable no-console */
import { FileMigrationProvider, Migrator } from 'kysely';
import { promises as fs } from 'node:fs';
import * as path from 'node:path';

import { db } from '@app/backend-shared';

const migrator = new Migrator({
  db,
  provider: new FileMigrationProvider({
    fs,
    path,
    // This needs to be an absolute path.
    migrationFolder: path.join(import.meta.dirname, '../../migrations'),
  }),
});

const { error, results } = await migrator.migrateDown();

if (results !== undefined)
  for (const it of results) {
    if (it.status === 'Success') {
      console.log(`migration "${it.migrationName}" was successfully reversed`);
    } else if (it.status === 'Error') {
      console.error(`failed to execute migration "${it.migrationName}"`);
    }
  }

if (Boolean(error)) {
  console.error('failed to migrate');
  console.error(error);
  throw error;
}

await db.destroy();
