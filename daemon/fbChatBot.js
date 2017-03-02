const moment = require('moment');
const login = require('facebook-chat-api');
const hwCatcher = require('./hwCatcher');
const overwatch = require('./overwatch');
// const x = require('../secret/secretProject');

const botID = '100014527650951';
const seanID = '100009254355771';
const battletags = 'SNstudio#4557\n大爾多#4791\nWesley#3213\njoshcarry#3786\nSnowBall#41836\nmikuXDD#4284\n阿宇仔仔#3676\nXWaynePigX#4542\n小嗚帕#4864\nwaterba1l#4821\nkevin#33536\nsmartdogs#3317\n焗烤馬鈴薯燉牛肉#4449';

const fbBot = () => {
  login({ email: 'qsnstudioq@gmail.com', password: '1qa2ws3ed' }, (e1, api) => {
    if (e1) {
      setInterval(fbBot(), 5 * 1000);
      return console.error(e1);
    }

    api.setOptions({
      forceLogin: true,
    });

    api.listen((e2, message) => {
      if (e2) {
        console.error(`e2:${e2}`);
      } else {
        api.markAsRead(message.threadID);
        console.log(JSON.stringify(message, null, 4));
        if (message.body === '/') {
          api.sendMessage('請問你要查詢：\n(1)查詢作業請打/hw\n(2)關於我請打/about\n(3)範例battletag請打/bt\n(4)查詢overwatch積分請打/ow <battletag>\n範例:/ow SNstudio#4557\n(5)比較overwatch戰積請打/比較 <第一個人的battletag> <第二個人的battletag>\n範例:/比較 SNstudio#4557 SnowBall#41836', message.threadID);
        } else if (message.body === '/hw') {
          const weekday = moment().utcOffset('+08:00').weekday();
          if (weekday === 6 || weekday === 0) {
            let time = moment().utcOffset('+08:00');

            if (weekday === 6) time = time.weekday(5).format('YYYYMMDD');
            else time = time.weekday(-2).format('YYYYMMDD');

            hwCatcher.getInfo(time, (e6, output) => {
              if (e6) {
                console.log(`e6:${e6}`);
              } else {
                api.sendMessage(output, message.threadID);
              }
            });
          } else {
            const time = moment().utcOffset('+08:00').format('YYYYMMDD');
            hwCatcher.getInfo(time, (e6, output) => {
              if (e6) {
                console.log(`e6:${e6}`);
              } else {
                api.sendMessage(output, message.threadID);
              }
            });
          }
        } else if (message.body === '/about') {
          api.sendMessage('我是屬於SNstudio的fb機器人\n我的主人是林奐呈\n若要參與開發請寄e-mail:\nseanlin12345@gmail.com', message.threadID);
        } else if (message.body === '/SNstudio') {
          api.sendMessage('主人什麼的最棒了XDDDD', message.threadID);
        } else if (message.body === '/bt') {
          api.sendMessage(`範例battletag:\n${battletags}`, message.threadID);
        } else if (/\/ow/.test(message.body)) {
          api.sendMessage('正在為您查詢中，請稍候...', message.threadID);
          try {
            const battletag = message.body.split(' ')[1];
            overwatch.output(battletag, (e100, result) => {
              if (e100) {
                console.log(`${e100}`);
              } else {
                api.sendMessage(`${result}`, message.threadID);
              }
            });
          } catch (error) {
            console.log(error);
            api.sendMessage('指令和battletag中間要空格', message.threadID);
          }
        } else if (/\/比較/.test(message.body)) {
          api.sendMessage('正在為您查詢中，請稍候...', message.threadID);
          try {
            const battletag1 = message.body.split(' ')[1];
            const battletag2 = message.body.split(' ')[2];
            overwatch.compare(battletag1, battletag2, (e100, result) => {
              if (e100) {
                console.log(`${e100}`);
              } else {
                api.sendMessage(`${result}`, message.threadID);
              }
            });
          } catch (error) {
            console.log(error);
            api.sendMessage('指令和battletag中間要空格', message.threadID);
          }
        } else if (message.body === '/kick') {
          if (message.senderID === seanID) {
            api.getThreadInfo(message.threadID, (e9, info) => {
              if (e9) {
                console.error(`e9:${e9}`);
              } else {
                for (let i = 0; i < info.participantIDs.length; i += 1) {
                  if (info.participantIDs[i] === botID) {
                    i += 1;
                  }
                  api.removeUserFromGroup(info.participantIDs[i], message.threadID, (e8) => {
                    if (e8) {
                      console.error(`e8:${e8}`);
                    } else {
                      console.log('success');
                    }
                  });
                }
                api.removeUserFromGroup(botID, message.threadID, (e10) => {
                  if (e10) {
                    console.error(`e10:${e10}`);
                  } else {
                    console.log('success');
                  }
                });
                console.log('finished');
              }
            });
          } else {
            api.sendMessage('你沒有權限使用', message.threadID);
          }
        }
      }
    });
    return 0;
  });
};
fbBot();
