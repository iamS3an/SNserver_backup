const request = require('request');
const cheerio = require('cheerio');


function getV(value, callback) {
  const url = 'http://www.nssh.ntpc.edu.tw/files/11-1000-90.php';
  request(url, (e1, response, body) => {
    if (!e1) {
      const $ = cheerio.load(body);
      const title1 = $('.ptcontent .clearfix .floatholder').html();
      // const title2 = $('').html();
      // const title3 = $('').html();
      // const v1 = $('').html();
      // const v2 = $('').html();
      // const v3 = $('').html();
      console.log(`${title1}`);
      callback('success!');
    } else {
      console.log(`e1：${e1}`);
    }
  });
}

module.exports = {
  getV,
};
