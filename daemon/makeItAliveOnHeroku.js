const http = require('http');
const schedule = require('node-schedule');

schedule.scheduleJob('1 1,11,21,31,41,51 * * * *', () => {
  console.log(`The answer to life, the universe, and everything!${new Date()}`);
  http.get({
    host: 'herokuwakeup.herokuapp.com',
    path: '/',
  }, (response) => {
        // Continuously update stream with data
    // let body = '';
    response.on('data', () => {
      // body += d;
    });
    response.on('end', () => {

    });
  });
});

module.exports = schedule;
