const cheerio = require('cheerio');
const request = require('request');
const contentJSON = require('./i18n.js');

function setRegion() {
  return 'zh-tw';
}

const region = setRegion();

const {
  BRONZE,
  SILVER,
  GOLD,
  PLATINUM,
  DIAMOND,
  MASTER,
  GRANDMASTER,
  CURRENT_SCORE,
  RANK,
  NONE,
  REGION,
  SERVER,
} = contentJSON[region];

function getRank(battletag, callback) {
  const tag = battletag.replace('#', '-').replace('<', '').replace('>', '');
  const url = encodeURI(`https://playoverwatch.com/${REGION}/career/pc/${SERVER}/${tag}`);
  request(url, (e1, response, body) => {
    if (e1) {
      console.error(`e1:${e1}`);
      callback(e1, null);
    } else {
      const $ = cheerio.load(body);
      const score = $('.competitive-rank').children().first().next().text();
      const scoreInt = parseInt(score, 10);
      let level;
      if (scoreInt <= 1499 && scoreInt >= 1) {
        level = BRONZE;
      } else if (scoreInt <= 1999 && scoreInt >= 1500) {
        level = SILVER;
      } else if (scoreInt <= 2499 && scoreInt >= 2000) {
        level = GOLD;
      } else if (scoreInt <= 2999 && scoreInt >= 2500) {
        level = PLATINUM;
      } else if (scoreInt <= 3499 && scoreInt >= 3000) {
        level = DIAMOND;
      } else if (scoreInt <= 3999 && scoreInt >= 3500) {
        level = MASTER;
      } else if (scoreInt >= 4000) {
        level = GRANDMASTER;
      } else {
        level = NONE;
      }
      callback(null, `${CURRENT_SCORE}${score}\n${RANK}${level}`);
    }
  });
}
function getInfo(battletag, callback) {
  const tag = battletag.replace('#', '-').replace('<', '').replace('>', '');
  const url = encodeURI(`https://playoverwatch.com/zh-tw/career/pc/kr/${tag}`);
  request(url, (e2, response, body) => {
    if (e2) {
      console.error(`e2:${e2}`);
      callback(e2, null);
    } else {
      const $ = cheerio.load(body);
      const value = [];
      const head = [];
      const quantValue = [];
      let result = '';
      $('#competitive .card-heading').each(function (i, elem) {
        value[i] = $(this).text();
        if (i === 6) { // time parsing
          const time = (parseInt($(this).text().split(':')[0], 10) * 60) + (parseInt($(this).text().split(':')[1], 10));
          quantValue.push(time);
        } else {
          quantValue.push(parseFloat($(this).text().replace(',', '')));
        }
      });
      $('#competitive .card-copy').each(function (i, elem) {
        head[i] = $(this).text();
      });
      for (let i = 0; i < value.length; i += 1) {
        result = `${result}${head[i]}:${value[i]}\n`;
      }
      console.log(`quantValue:${quantValue}`);
      const returnObject = {
        text: result,
        quantValue,
        head,
      };
      callback(null, returnObject);
    }
  });
}

function output(battletag, callback) {
  let things;
  getRank(battletag, (e4, score) => {
    if (e4) {
      console.log(`${e4}`);
      callback(e4, null);
    } else {
      getInfo(battletag, (e5, result) => {
        if (e5) {
          console.log(`${e5}`);
          callback(e5, null);
        } else {
          things = `${score}\n${result.text}`;
          callback(null, `${things}`);
        }
      });
      // things = `${things}`;
    }
  });
}

function compare(battletag1, battletag2, callback) {
  getInfo(battletag1, (e6, d1) => {
    if (e6) {
      console.log(`e6:${e6}`);
      callback(e6, null);
    } else {
      const data1 = d1.quantValue;
      getInfo(battletag2, (e7, d2) => {
        if (e7) {
          console.log(`e7:${e7}`);
          callback(e7, null);
        } else {
          const data2 = d2.quantValue;
          let output = '';
          const title = d2.head;
          for (let i = 0; i < title.length; i++) {
            if (data1[i] > data2[i]) {
              output = `${output}${title[i]}: ${battletag1.split('#')[0]}  Win\n`;
            } else if (data1[i] < data2[i]) {
              output = `${output}${title[i]}: ${battletag2.split('#')[0]}  Win\n`;
            } else {
              output = `${output}${title[i]}:平手\n`;
            }
          }
          callback(null, output);
        }
      });
    }
  });
}


module.exports = {
  output,
  compare,
};
