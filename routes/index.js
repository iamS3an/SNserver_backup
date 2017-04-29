const express = require('express');

const router = express.Router();

/* GET home page. */
router.get('/', (req, res) => {
  res.render('index', { title: 'Express' });
});

router.get('/schoolTodoListInterface', (req, res) => {
  res.render('schoolTodoListInterface', { title: 'Express' });
});

router.get('/schoolTodoListBlackboard', (req, res) => {
  res.render('schoolTodoListBlackboard', { date: req.query.date });
});

module.exports = router;
