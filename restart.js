const exec = require('child_process').exec;
const moment = require('moment');

const SNbot = 'pm2 restart fbChatBot';
const SeanLinBot = 'pm2 restart SeanLinReadBot';
const SeanLinBotStop = 'pm2 stop SeanLinReadBot';
// const cmdStr = 'echo hellooooooo';

setInterval(() => {
  if (moment().hours() === 21) {
    exec(SNbot, (err, stdout, stderr) => {
      if (err) {
        console.log(`error:${stderr}`);
      } else {
        // const data = JSON.parse(stdout);
        console.log(stdout);
      }
    });
  }
  if (moment().hours() === 15) {
    exec(SeanLinBot, (err, stdout, stderr) => {
      if (err) {
        console.log(`error:${stderr}`);
      } else {
        // const data = JSON.parse(stdout);
        console.log(stdout);
      }
    });
  }
  if (moment().hours() === 22) {
    exec(SeanLinBotStop, (err, stdout, stderr) => {
      if (err) {
        console.log(`error:${stderr}`);
      } else {
        // const data = JSON.parse(stdout);
        console.log(stdout);
      }
    });
  }
}, 1000 * 3600 * 1); // Hourly check
