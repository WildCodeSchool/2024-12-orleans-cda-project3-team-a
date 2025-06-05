import { CronJob } from 'cron';

new CronJob(
  '* * * * *', // cronTime each sec
  function () {
    console.log('You will see this message every second');
    //delete if visitor is inactive
  }, // onTick
  null, // onComplete
  true, // start
  'Europe/Paris', // timeZone
);
