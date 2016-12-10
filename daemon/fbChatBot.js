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
      if(message.body == "time") {
        api.sendMessage(Date(), message.threadID);
      }
      else {
        api.sendMessage(message.body, message.threadID);
      }
    });
  });
};

module.exports = {
  fbBot,
};
