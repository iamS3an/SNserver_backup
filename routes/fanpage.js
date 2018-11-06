const express = require('express');
const request = require('request');
const moment = require('moment');
// const overwatch = require('../daemon/overwatch');
const hw = require('../daemon/hwCatcher');
// const MongoClient = require('mongodb').MongoClient;

const router = express.Router();
// const mongodbUrl = 'mongodb://snserver:1qa2ws3ed@ds017636.mlab.com:17636/seandb';
// const owToken = 'EAABxkUvtNC8BABa7ePKEVEVP4pvARpX8HUfZB5i8VKGQH02YEi7Qnt8y8wmqL17ZAXKlSrMQZCu4apR55nDTOMU1FZCZB04VRZC3pV5GLSqtuq18Asl981cwOO6GlHZAle8fmdWK6vaH5ZCErT3kH2U8Ppp8s3aEvoPnfZBCdjksRugZDZD';
const hwToken = 'EAADFXUMf4EwBABL9SZC5IivfRR4jRJAtzCo8m1E4ASOO2Hf5LzjrFNQujjGppi8SipeT4ZBZALVRBUIBh6ak7vTu0CuFjpzJN4GuR6CXJA218Ma7xIT4O1Ghc7US4lzrjByV98KbLLXTFkhyCyZCAFhZCtAkK954p6YBiZARNXZBwZDZD';
// const hwToken = '70941302502d1ab4efe07b5f62753f11';
router.get('/', (req, res) => {
  if (req.query['hub.verify_token'] === 'snstudio666') {
    console.log('666');
    res.send(req.query['hub.challenge']);
    // console.log('666');
  } else if (req.query['hub.verify_token'] === 'snstudio777') {
    console.log('777');
    res.send(req.query['hub.challenge']);
    // console.log('777');
  }
  res.send('Error, wrong validation token');
});

function callSendAPI(messageData, token) {
  request({
    uri: 'https://graph.facebook.com/v2.6/me/messages',
    qs: { access_token: token },
    method: 'POST',
    json: messageData,

  }, (error, response, body) => {
    if (!error && response.statusCode === 200) {
      const recipientId = body.recipient_id;
      const messageId = body.message_id;

      console.log('Successfully sent generic message with id %s to recipient %s',
        messageId, recipientId);
    } else {
      console.error('Unable to send message.');
      console.error(response);
      console.error(error);
    }
  });
}

function sendTextMessageHw(recipientId, messageText) {
  const messageData = {
    recipient: {
      id: recipientId,
    },
    message: {
      text: messageText,
    },
  };

  callSendAPI(messageData, hwToken);
}

// function sendTextMessageOw(recipientId, messageText) {
//   const messageData = {
//     recipient: {
//       id: recipientId,
//     },
//     message: {
//       text: messageText,
//     },
//   };
//   callSendAPI(messageData, owToken);
// }

// function initialTextMessage(recipientId) {
//   sendTextMessageOw(recipientId, '(1)查詢overwatch積分請打/ow <battletag>\n範例:/ow SNstudio#4557\n(2)比較overwatch戰積請打/比較 <第一個人的battletag> <第二個人的battletag>\n範例:/比較 SNstudio#4557 大爾多#4791');
//   // sendHotKeywordQuickReply(recipientId);
// }

// function register(senderID, battletag) {
//   MongoClient.connect(mongodbUrl, (err, database) => {
//     const collection = database.collection('battletagtable');
//     const btObject = {
//       battletag,
//       senderID,
//     };
//     const filter = {
//       senderID,
//     };
//     collection.updateMany(filter, { $set: btObject }, { upsert: true }, (error) => {
//       if (!error) {
//         console.log('success');
//       } else {
//         console.log('fail');
//       }
//     });
//   });
//   sendTextMessageOw(senderID, `${battletag}已和您的fb帳號綁定!`);
// }

// function getUserInfo(senderID, callback) {
//   MongoClient.connect(mongodbUrl, (err, database) => {
//     const collection = database.collection('battletagtable');
//     const filter = {
//       senderID,
//     };
//     collection.find(filter).toArray((error, docs) => {
//       if (!error) {
//         if (docs.length === 0) {
//           callback('cannot find the battletag', null);
//         } else {
//           callback(null, docs[0].battletag);
//         }
//       } else {
//         callback(error, null);
//       }
//     });
//   });
// }

function hwCatch(senderID) {
  const weekday = moment().utcOffset('+08:00').weekday();
  sendTextMessageHw(senderID, '正在為您查詢中，請稍候٩(˃̶͈̀௰˂̶͈́)و');
  if (weekday === 6 || weekday === 0) {
    let time = moment().utcOffset('+08:00');

    if (weekday === 6) time = time.weekday(5).format('YYYYMMDD');
    else time = time.weekday(-2).format('YYYYMMDD');

    hw.getInfo(time, (e2, output) => {
      if (e2) {
        console.log(`e2:${e2}`);
      } else {
        sendTextMessageHw(senderID, output);
      }
    });
  } else {
    const time = moment().utcOffset('+08:00').format('YYYYMMDD');
    hw.getInfo(time, (e1, output) => {
      if (e1) {
        console.log(`e1:${e1}`);
      } else {
        sendTextMessageHw(senderID, output);
      }
    });
  }
}

function receivedMessage(event) {
  const senderID = event.sender.id;
  const recipientID = event.recipient.id;
  const timeOfMessage = event.timestamp;
  const message = event.message;

  console.log('Received message for user %d and page %d at %d with message:',
    senderID, recipientID, timeOfMessage);
  console.log(JSON.stringify(message));

  const messageText = message.text;
  // const messageAttachments = message.attachments;
  console.log(`senderID:${senderID}`);
  if (messageText) {
    if (/20/.test(messageText)) {
      sendTextMessageHw(senderID, '正在為您查詢中，請稍候٩(˃̶͈̀௰˂̶͈́)و');
      hw.getInfo(messageText, (e2, output) => {
        if (e2) {
          console.log(`e2:${e2}`);
        } else {
          sendTextMessageHw(senderID, output);
        }
      });
    } else if (/謝/.test(messageText)) {
      sendTextMessageHw(senderID, '不客氣');
    } else if (/hi/.test(messageText) || /嗨/.test(messageText) || /Hi/.test(messageText)) {
      sendTextMessageHw(senderID, 'Hi!你好');
    } else if (/help/.test(messageText) || /Help/.test(messageText)) {
      sendTextMessageHw(senderID, '正在通知開發者中，請稍候...');
      sendTextMessageHw(1229662330493167, `來自使用者${senderID}的求助！`);
    }
  }
  // if (messageText) {
  //   if (/ow/.test(messageText)) {
  //     console.log('/ow.....');
  //     try {
  //       const msg = messageText;
  //       const battletag = msg.split(' ')[1];
  //       sendTextMessageOw(senderID, '正在為您查詢中，請稍候...');
  //       overwatch.output(battletag, (e100, result) => {
  //         if (e100) {
  //           console.log(`${e100}`);
  //         } else {
  //           sendTextMessageOw(senderID, `${result}`);
  //         }
  //       });
  //     } catch (error) {
  //       console.log(error);
  //       sendTextMessageOw(senderID, '錯誤 > <');
  //     }
  //   } else if (/比較/.test(messageText)) {
  //     try {
  //       const battletag1 = messageText.split(' ')[1];
  //       const battletag2 = messageText.split(' ')[2];
  //       sendTextMessageOw(senderID, '正在為您查詢中，請稍候...');
  //       overwatch.compare(battletag1, battletag2, (e101, result) => {
  //         if (e101) {
  //           console.log(`${e101}`);
  //         } else {
  //           sendTextMessageOw(senderID, `${result}`);
  //         }
  //       });
  //     } catch (error) {
  //       console.log(error);
  //       sendTextMessageOw(senderID, '錯誤 > <');
  //     }
  //   } else if (/help/.test(messageText)) {
  //     initialTextMessage(senderID);
  //   } else if (/bt/.test(messageText)) {
  //     try {
  //       const msg = messageText;
  //       const battletag = msg.split(' ')[1];
  //       // sendTextMessageOw(senderID, '正在為您連結中，請稍候...');
  //       register(senderID, battletag);
  //     } catch (error) {
  //       console.log(error);
  //       sendTextMessageOw(senderID, '錯誤 > <');
  //     }
  //   } else if (messageAttachments) {
  //     sendTextMessageOw(senderID, '你在讚什麼？');
  //   } else if (/my/.test(messageText)) {
  //     try {
  //       // const msg = messageText;
  //       getUserInfo(senderID, (e103, bt) => {
  //         if (e103) {
  //           console.log(e103);
  //           sendTextMessageOw(senderID, '你沒註冊喔');
  //         } else {
  //           sendTextMessageOw(senderID, '正在為您查詢中，請稍候...');
  //           overwatch.output(bt, (e102, result) => {
  //             if (e102) {
  //               console.log(`${e102}`);
  //             } else {
  //               sendTextMessageOw(senderID, `${result}`);
  //             }
  //           });
  //         }
  //       });
  //     } catch (error) {
  //       console.log(error);
  //       sendTextMessageOw(senderID, '錯誤 > <');
  //     }
  //   } else {
  //     sendTextMessageOw(senderID, '我看不懂你在說什麼');
  //   }
  // }
}

function receivedPostback(event) {
  const senderID = event.sender.id;
  const recipientID = event.recipient.id;
  const timeOfPostback = event.timestamp;

  // The 'payload' param is a developer-defined field which is set in a postback
  // button for Structured Messages.
  const payload = event.postback.payload;
  console.log(event);
  console.log("Received postback for user %d and page %d with payload '%s' " +
    'at %d', senderID, recipientID, payload, timeOfPostback);

  // When a postback is called, we'll send a message back to the sender to
  // let them know it was successful
  switch (payload) {
    // case 'GET_STARTED_PAYLOAD':
    //   initialTextMessage(senderID);
    //   break;
    // case 'MANUAL_PAYLOAD':
    //   initialTextMessage(senderID);
    //   break;
    // case 'BINDBATTLETAG_PAYLOAD':
    //   sendTextMessageOw(senderID, '輸入/bt <你的battletag>來把你的fb帳號和battletag連結\n以後你只要打/my就可以查詢你的戰績');
    //   break;
    case 'HW_PAYLOAD':
      hwCatch(senderID);
      break;
    case 'zzz':
      hwCatch(senderID);
      break;
    default:
      sendTextMessageHw(senderID, '還沒做好');
      break;
  }
}

router.post('/', (req, res) => {
  const data = req.body;
  console.log(`${JSON.stringify(data, null, 4)}`);
  // Make sure this is a page subscription
  if (data.object === 'page') {
    // Iterate over each entry - there may be multiple if batched
    data.entry.forEach((entry) => {
      const pageID = entry.id;
      // const timeOfEvent = entry.time;
      console.log(`pageID: ${pageID}`);
      // Iterate over each messaging event
      entry.messaging.forEach((event) => {
        if (event.optin) {
          // receivedAuthentication(event);
        } else if (event.message) {
          receivedMessage(event);
        } else if (event.postback) {
          receivedPostback(event);
        } else {
          console.error('Webhook received unknown messagingEvent: ', event);
        }
      });
    });

    // Assume all went well.
    //
    // You must send back a 200, within 20 seconds, to let us know
    // you've successfully received the callback. Otherwise, the request
    // will time out and we will keep trying to resend.
    res.sendStatus(200);
  }
});

module.exports = router;
