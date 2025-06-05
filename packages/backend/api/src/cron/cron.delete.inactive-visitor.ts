import { CronJob } from 'cron';

new CronJob(
  '* * * * * *', // cronTime each sec
  function () {
    console.log('You will see this message every second');
  }, // onTick
  null, // onComplete
  true, // start
  'Europe/Paris', // timeZone
);
