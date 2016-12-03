var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', (req, res, next) => {
  res.render('index', { title: 'Hi,你好' });
});

// //botzzz
//
// router.get('/webhook', function (req, res) {
//   if (req.query['hub.verify_token'] === 'snstudio666') {
//     res.send(req.query['hub.challenge']);
//   }
//   res.send('Error, wrong validation token');
// })
//
// router.post('/webhook/', function (req, res) {
//   messaging_events = req.body.entry[0].messaging;
//
//   for (i = 0; i < messaging_events.length; i++) {
//
//     event = req.body.entry[0].messaging[i];
//     sender = event.sender.id;
//
//     if (event.message && event.message.text) {
//       text = event.message.text;
//       }
//   }
//   res.sendStatus(200);
// });
//
// var token = "EAAH2ZBhU24hQBAJ4eBJwbrjjDKsd0E8a3mF0PhWIB8Y4cPB7qxXtxzfge3oTpX7yWClHgFUafQoodjWmZAyeqm1XlehLgY1qVq94BYoTZCSA9EkXUmZCT3Pk8j9UmNN67eDfQl7TUY4E8slwUlas2ZAp70sLsDWVMiAYtZBnf42AZDZD";
//
// function sendTextMessage(sender, text) {
//   messageData = {
//     text:text
//   }
//   request({
//     url: 'https://graph.facebook.com/v2.6/me/messages',
//     qs: {access_token:token},
//     method: 'POST',
//     json: {
//       recipient: {id:sender},
//       message: messageData,
//     }
//   }, function(error, response, body) {
//     if (error) {
//       console.log('Error sending message: ', error);
//     } else if (response.body.error) {
//       console.log('Error: ', response.body.error);
//     }
//   });
// }
//
// //botzzz

router.get('/schoolTodoListInterface', (req, res, next) => {
  res.render('schoolTodoListInterface', { title: 'Express' });
});

router.get('/schoolTodoListBlackboard', (req, res, next) => {
  res.render('schoolTodoListBlackboard', { date: req.query.date } );
});

module.exports = router;
