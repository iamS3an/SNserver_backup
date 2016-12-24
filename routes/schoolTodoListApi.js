const MongoClient = require('mongodb').MongoClient;
const express = require('express');

const mongodbUrl = 'mongodb://snserver:1qa2ws3ed@ds017636.mlab.com:17636/seandb';
const router = express.Router();

/* GET users listing. */
router.post('/v1/todo', (req, res) => {
  if (!req.body.date || req.body.date === '') {
    res.status(400).json({
      status: 'fail',
      message: "date can't be empty!",
    });
  } else {
    MongoClient.connect(mongodbUrl, (err, database) => {
      const collection = database.collection('todo');
      const todoObject = {
        hw: req.body.hw,
        toBring: req.body.toBring,
        test: req.body.test,
        date: req.body.date,
      };
      const filter = {
        date: req.body.date,
      };
      collection.updateMany(filter, { $set: todoObject }, { upsert: true }, (error, docs) => {
        if (!error) {
          res.status(201).json({
            status: 'success',
            result: docs,
          });
        } else {
          res.status(500).json({
            status: 'fail',
            result: docs,
          });
        }
      });
    });
  }
});

router.get('/v1/todo', (req, res) => {
  if (!req.query.date || req.query.date === '') {
    res.status(400).json({
      status: 'fail',
      message: "date can't be empty!",
    });
  } else {
    MongoClient.connect(mongodbUrl, (err, database) => {
      const collection = database.collection('todo');
      const filter = {
        date: req.query.date,
      };
      collection.find(filter).toArray((error, docs) => {
        if (!error) {
          if (docs.length === 0) {
            res.status(404).json({
              status: 'fail',
              message: 'Can not find the data of the date.',
            });
          } else {
            res.status(200).json({
              status: 'success',
              result: docs[0],
            });
          }
        }
      });
    });
  }
});


module.exports = router;
