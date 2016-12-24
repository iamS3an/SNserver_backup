const login = require('facebook-chat-api');
const _ = require('lodash');

const peterID = '100005650576135';
const partyID = '1189977174366850';
// const testID = '100001504021620';
const seanID = '100009254355771';
// const testPartyID = '1362278277118706';

const fbBot = () => {
  login({ email: 'qsnstudioq@gmail.com', password: '1qa2ws3ed' }, (e1, api) => {
    if (e1) {
      setInterval(fbBot(), 5 * 1000);
      return console.error(e1);
    }

    api.setOptions({
      forceLogin: true,
    });


    const check = (info, message) => {
      // for (var i = 0; i < info.participantIDs.length; i++) {
      //   info.participantIDs[i]
      // }
      if (_.indexOf(info.participantIDs, seanID) < 0) {
        api.sendMessage('我主人不在裡面ㄟ，一定是大耳朵幹的', message.threadID);
        api.removeUserFromGroup(peterID, partyID, (e4) => {
          if (e4) {
            console.error(`e4:${e4}`);
          } else {
            console.log('kicked');
          }
        });
        api.addUserToGroup(seanID, partyID, (e5) => {
          if (e5) {
            console.error(`e5:${e5}`);
          } else {
            console.log('added');
          }
        });
      }
    };

    api.listen((e2, message) => {
      if (e2) {
        console.error(`e2:${e2}`);
      } else {
        api.markAsRead(message.threadID);
        console.log(JSON.stringify(message, null, 4));
        if (message.body === '/') {
          api.sendMessage('請問你要查詢：\n(1)查詢作業請打"/" + hw\n(2)關於我請打"/" + about', message.threadID);
        } else if (message.body === '/hw') {
          api.sendMessage('還沒做好', message.threadID);
        } else if (message.body === '/about') {
          api.sendMessage('我是屬於SNstudio的fb機器人\n我的主人是林奐呈\n若要參與開發請寄e-mail:\nseanlin12345@gmail.com', message.threadID);
        } else if (message.body === '/SNstudio') {
          api.sendMessage('主人什麼的最棒了XDDDD', message.threadID);
        }
        api.getThreadInfo(partyID, (e3, info) => {
          if (e3) {
            console.error(`e3:${e3}`);
          } else {
            check(info, message);
          }
        });
      }
    });
    // setInterval(check(info, message), 60 * 1000);

    // api.getUserID("測試", function(err, data) {
    //     if(err) return callback(err);
    //     partyID = data[0].userID;
    //     console.log(party);
    // });
    // api.getUserID("Wilson Huang", function(err, data) {
    //     if(err) return callback(err);
    //     userID = data[0].userID;
    //     console.log(userID);
    // })
    return 0;
  });
  return 0;
};

module.exports = {
  fbBot,
};
