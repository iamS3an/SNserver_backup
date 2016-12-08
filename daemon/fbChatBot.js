var login = require("facebook-chat-api");

const fbBot = () => {
  login({email: "qsnstudioq@gmail.com", password: "1qa2ws3ed"}, function callback (err, api) {
    if(err) {
      setInterval(markAsRead(), 5 * 1000);
      return console.error(err);
    }

    api.setOptions({
      forceLogin: true
    });

    api.listen(function callback(err, message) {
      // api.markAsRead(message.threadID);
      api.sendMessage(message.body, message.threadID);
    });
  });
};

module.exports = {
  fbBot,
};
