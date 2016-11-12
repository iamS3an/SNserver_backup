var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Hi,你好' });
});

router.get('/webhook', function (req, res) {
  if (req.query['hub.verify_token'] === 'snstudio666') {
    res.send(req.query['hub.challenge']);
  }
  res.send('Error, wrong validation token');
})

router.get('/interface', function(req, res, next) {
  res.render('interface', { title: 'Express' });
});

router.get('/blackboard', function(req, res, next) {
  res.render('blackboard', { date: req.query.date } );
});

module.exports = router;
