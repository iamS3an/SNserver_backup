const express = require('express');
const request = require('request');
const overwatch = require('../daemon/overwatch');

const router = express.Router();

router.get('/', (req, res) => {
  if (req.query['hub.verify_token'] === 'snstudio666') {
    res.send(req.query['hub.challenge']);
  }
  res.send('Error, wrong validation token');
});

function callSendAPI(messageData) {
  request({
    uri: 'https://graph.facebook.com/v2.6/me/messages',
    qs: { access_token: 'EAABxkUvtNC8BAHlax7Kr5ZCwlLr7XoZB7OB5Bsn5pgZBeFboeJom1vtQvtQuolc79SAHR2k3XDVZB6EyKoprnCcI9waNpKY1vzYHXkDllRwOKyU3DiyP4NdmrCXvYwlXBZCtZAocEhyUVCi8RZCZCR26bPYiIDCedbLR8nrcOLJyiwZDZD' },
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

function sendTextMessage(recipientId, messageText) {
  const messageData = {
    recipient: {
      id: recipientId,
    },
    message: {
      text: messageText,
    },
  };

  callSendAPI(messageData);
}

function initialTextMessage(recipientId) {
  sendTextMessage(recipientId, '(1)查詢overwatch積分請打/ow <battletag>\n範例:/ow SNstudio#4557\n(2)比較overwatch戰積請打/比較 <第一個人的battletag> <第二個人的battletag>\n範例:/比較 SNstudio#4557 大爾多#4791');
  // sendHotKeywordQuickReply(recipientId);
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
  const messageAttachments = message.attachments;

  if (messageText) {
    if (/\/ow/.test(messageText)) {
      console.log('/ow.....');
      try {
        const msg = messageText;
        const battletag = msg.split(' ')[1];
        sendTextMessage(senderID, '正在為您查詢中，請稍候...');
        overwatch.output(battletag, (e100, result) => {
          if (e100) {
            console.log(`${e100}`);
          } else {
            sendTextMessage(senderID, `${result}`);
          }
        });
      } catch (error) {
        console.log(error);
        sendTextMessage(senderID, '錯誤 > <');
      }
    } else if (/\/比較/.test(messageText)) {
      try {
        const battletag1 = messageText.split(' ')[1];
        const battletag2 = messageText.split(' ')[2];
        sendTextMessage(senderID, '正在為您查詢中，請稍候...');
        overwatch.compare(battletag1, battletag2, (e101, result) => {
          if (e101) {
            console.log(`${e101}`);
          } else {
            sendTextMessage(senderID, `${result}`);
          }
        });
      } catch (error) {
        console.log(error);
        sendTextMessage(senderID, '錯誤 > <');
      }
    } else if (/help/.test(messageText)) {
      initialTextMessage(senderID);
    }
  } else if (messageAttachments) {
    sendTextMessage(senderID, '你在讚什麼？');
  }
}

function heroQuery(heroid) {
  switch (heroid) {
    case 1:

      break;
    default:

  }
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
    case 'GET_STARTED_PAYLOAD':
      initialTextMessage(senderID);
      break;
    case 'MANUAL_PAYLOAD':
      initialTextMessage(senderID);
      break;
    case 'BINDBATTLETAG_PAYLOAD':
      sendTextMessage(senderID, '輸入/bt <你的battletag>來把你的fb帳號和battletag連結\n以後你只要打/my就可以查詢你的戰績');
      break;
    default:
      sendTextMessage(senderID, '還沒做好');
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
