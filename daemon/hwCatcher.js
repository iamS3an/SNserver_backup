const MongoClient = require('mongodb').MongoClient;

const mongodbUrl = 'mongodb://snserver:1qa2ws3ed@ds017636.mlab.com:17636/seandb';

function getInfo(date, callback) {
  MongoClient.connect(mongodbUrl, (e1, database) => {
    if (e1) {
      console.log(`e1:${e1}`);
      callback('MongoClient connect error', null);
    } else {
      const collection = database.collection('todo');
      const filter = {
        date,
      };
      collection.find(filter).toArray((e2, docs) => {
        if (e2) {
          console.log(`e2:${e2}`);
          callback('find error');
        } else if (docs.length >= 1) {
          const output = `${docs[0].hw}\n${docs[0].toBring}\n${docs[0].test}`;
          callback(null, output);
        } else { // success but no target data in db.
          callback(null, '找不到今日資料 (´･ω･`)');
        }
      });
    }
  });
}

module.exports = {
  getInfo,
};
