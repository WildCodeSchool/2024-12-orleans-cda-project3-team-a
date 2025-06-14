//cron to delete inactiv visitors
import { CronJob } from 'cron';
import { sql } from 'kysely';

import { db } from '@app/backend-shared';

new CronJob(
  '0 */8 * * *', //cronTime each 8 hours

  async function () {
    await db
      .deleteFrom('park_visitors')
      .where('exit_time', '<', sql<Date>`NOW()`)
      .execute();
  },
  null, // onComplete
  true, // start
  'Europe/Paris', // timeZone
);
