const express = require('express');

const router = express.Router();

/* GET home page. */
router.get('/', (req, res) => {
  res.render('index', { title: 'Express' });
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

router.get('/schoolTodoListInterface', (req, res) => {
  res.render('schoolTodoListInterface', { title: 'Express' });
});

router.get('/schoolTodoListBlackboard', (req, res) => {
  res.render('schoolTodoListBlackboard', { date: req.query.date });
});

module.exports = router;
