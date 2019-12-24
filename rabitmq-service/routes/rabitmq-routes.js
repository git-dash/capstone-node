var express = require('express');
var router = express.Router();
var messageCtrl = require('../controller/rabit-service')
const localConfig = require('../config');
/* GET home page. */
router.post('/message-queue', async (req, res) => {


  let payload = {
    dummyMessage: req.body['dummyMessage']
  }
  let orderMessage = messageCtrl.pushMessageToTheQueue(localConfig.orderChannelName, payload);
  console.log(`this is the orderMessage response ${JSON.stringify(orderMessage)}`);

  let emailMessage = messageCtrl.pushMessageToTheQueue(localConfig.emailMessageChannelName, payload);
  console.log(`this is the emailMessage response ${JSON.stringify(emailMessage)}`);


  res.status(200).json({
    message: 'message Sent'
  });

});

module.exports = router;
