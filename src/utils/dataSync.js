const cron = require('node-cron');

let cronJobStarted = false; // The cron job is running twice when in the development enviroment. This is just a quick work around
//TODO: REMOVE THIS BEFORE PRODUCTION!!!!!

/**
 * Cron job that synchronizing the data in the database with the data on Github.
 */
const startDataSync = () => {
  if (!cronJobStarted) {
    cronJobStarted = true;

    cron.schedule('* * * * *', async () => {
      try {
        console.log('Synchronizing data between Github and database.');
        cronJobStarted = false;
      } catch (error) {
        console.log(error);
      }
    });

    console.log('Cron job has been started.');
  }
};

module.exports = startDataSync;
