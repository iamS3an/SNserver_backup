const MongoClient = require('mongodb').MongoClient;
const mongodbUrl = 'mongodb://localhost:27017/todo';
var express = require('express');
var router = express.Router();

/* GET users listing. */
router.post('/v1/todo', function(req, res, next) {
  if (!req.body.date || req.body.date == '') {
    res.status(400).json({
      status: "fail",
      message: "date can't be empty!"
    });
  }
  else {
    MongoClient.connect(mongodbUrl, function (err, database) {
      var collection = database.collection('todo');
      var todoObject = {
        hw: req.body.hw,
        toBring: req.body.toBring,
        test: req.body.test,
        date: req.body.date
      };
      var filter = {
        date: req.body.date
      };
      collection.updateMany(filter, {$set: todoObject}, {upsert: true}, function (error, docs) {
        if (!error) {
          res.status(201).json({
            status: "success",
            result: docs
          });
        }
        else {
          res.status(500).json({
            status: "fail",
            result: docs
          });
        }
      });
    });
  }
});

router.get('/v1/todo', function(req, res, next) {
  if (!req.query.date || req.query.date == '') {
    res.status(400).json({
      status: "fail",
      message: "date can't be empty!"
    });
  }
  else {
    MongoClient.connect(mongodbUrl, function (err, database) {
      var collection = database.collection('todo');
      var filter = {
        date: req.query.date
      };
      collection.find(filter).toArray(function (error, docs) {
        if (!error) {
          if (docs.length == 0) {
            res.status(404).json({
              status: "fail",
              message: "Can not find the data of the date."
            });
          }
          else {
            res.status(200).json({
              status: "success",
              result: docs[0]
            });
          }
        }
      });
    });
  }
});





module.exports = router;
