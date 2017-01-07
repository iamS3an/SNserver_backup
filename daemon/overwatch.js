const cheerio = require('cheerio');
const request = require('request');
// const stringjs = require('string');

function getRank(battletag, callback) {
  const tag = battletag.replace('#', '-');
  const url = `https://playoverwatch.com/zh-tw/career/pc/kr/${tag}`;

  request(url, (e1, response, body) => {
    if (e1) {
      console.error(`e1:${e1}`);
    } else {
      const $ = cheerio.load(body);
      // console.log(body);
      const score = $('.competitive-rank').children().first().next().text();
      // const scoreString = stringjs(score).collapseWhitespace().s.split(' ')[0];
      // console.log(scoreString);
      const scoreInt = parseInt(score, 10);
      // console.log(scoreInt);
      let level;
      if (scoreInt <= 1499 && scoreInt >= 1) {
        level = '銅牌';
      } else if (scoreInt <= 1999 && scoreInt >= 1500) {
        level = '銀牌';
      } else if (scoreInt <= 2499 && scoreInt >= 2000) {
        level = '金牌';
      } else if (scoreInt <= 2999 && scoreInt >= 2500) {
        level = '白金';
      } else if (scoreInt <= 3499 && scoreInt >= 3000) {
        level = '鑽石';
      } else if (scoreInt <= 3500 && scoreInt >= 3999) {
        level = '大師';
      } else if (scoreInt >= 4000) {
        level = '宗師';
      }
      // const krRank = $('.header-stats').children().next().children().first().text();
      // const krRankString = stringjs(krRank).collapseWhitespace().s.replace('#', '');
      callback(null, `目前積分:${score}\n所屬牌位:${level}`);
    }
  });
}

// getRank('大爾多#4791', (error, result) => {
//   console.log(`${result}`);
// });
module.exports = {
  getRank,
};
