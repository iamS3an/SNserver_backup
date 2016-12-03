var login = require("facebook-chat-api");

const markAsRead = () => {
  login({email: "seanlin12345@gmail.com", password: "S1qa2ws3edS"}, function callback (err, api) {
    if(err) {
      setInterval(markAsRead(), 6 * 1000);
      return console.error(err);
    }


    api.setOptions({
      forceLogin: true
    });

    api.listen(function callback(err, message) {
      // Marks message as read immediately after they're sent
      api.markAsRead(message.threadID);
    });
  });
};

module.exports = {
  markAsRead,
};
