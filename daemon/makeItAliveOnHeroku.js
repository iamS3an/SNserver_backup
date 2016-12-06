var http = require('http');
var schedule = require('node-schedule');

schedule.scheduleJob('1 1,11,21,31,41,51 * * * *', function(){
  console.log('The answer to life, the universe, and everything!' + new Date());
  http.get({
        host: 'snfbbot.herokuapp.com',
        path: '/'
  }, function(response) {
        // Continuously update stream with data
        var body = '';
        response.on('data', function(d) {
            body += d;
        });
        response.on('end', function() {

        });
    });
});

module.exports = schedule;
