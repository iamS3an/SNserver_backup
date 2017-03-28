const cheerio = require('cheerio');
const request = require('request');
// M15X Was HERE
function getV(things, callback) {
  const url = encodeURI('https://wuso.me/forum-jsav-1.html');

  request(url, (e1, response, body) => {
    if (e1) {
      console.error(`e1:${e1}`);
    } else {
      const $ = cheerio.load(body);
      // console.log(body);
      const link1 = $('#waterfall').children().first().children().children().attr('href');
      // const link2 = $('#waterfall').children().first().next().children().children().attr('href');
      // const link3 = $('#waterfall').children().first().next().next().children().children().attr('href');
      callback(null, `${link1}`);
    }
  });
}

// getV('zzz', (error, result) => {
//   console.log(`${result}`);
// });
module.exports = {
  getV,
};
