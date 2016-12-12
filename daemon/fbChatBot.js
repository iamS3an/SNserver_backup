var login = require("facebook-chat-api");

const fbBot = () => {
  login({email: "qsnstudioq@gmail.com", password: "1qa2ws3ed"}, function callback (err, api) {
    if(err) {
      setInterval(fbBot(), 5 * 1000);
      return console.error(err);
    }

    api.setOptions({
      forceLogin: true
    });

    api.listen(function callback(err, message) {
      api.markAsRead(message.threadID);
      if(message.body == "@") {
        api.sendMessage("請問你要查詢：\n(1)大耳朵的戰績\n(2)其他", message.threadID);
        if(message.body == "1" || "(1)") {
          api.sendMessage("還沒做好XD", message.threadID);
        }
        else {
          api.sendMessage("目前暫不開放", message.threadID);
        }
      }
    });
  });
};

module.exports = {
  fbBot,
};
