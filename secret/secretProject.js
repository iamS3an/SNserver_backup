const cheerio = require('cheerio');
const request = require('request');

function getV(things, callback) {
  const url = 'http://www.euphoriaporn.com/top-japanese/page-1.php';

  request(url, (e1, response, body) => {
    if (e1) {
      console.error(`e1:${e1}`);
    } else {
      const $ = cheerio.load(body);
      // console.log(body);
      const link = $('#left-column-wide').children().first().next().next().children().children().children().first().attr('href');
      console.log('success!');
      callback(null, `http://www.euphoriaporn.com${link}`);
    }
  });
}

// getV('zzz', (error, result) => {
//   console.log(`${result}`);
// });
module.exports = {
  getV,
};
