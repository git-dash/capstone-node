var express = require('express');
var router = express.Router();
const mailerCtrl = require('../controller/nodemailer-service');
router.post('/notify-email', async (req, res) => {

  console.log(req.body);


  let mailRequest = await mailerCtrl.sendMail({
    to: req.body.to  //'learn.music.med@gmail.com'
  })
  console.log(mailRequest);

  res.json({
    message: `mail sent`,
    mailInfo: mailRequest
  })
});

module.exports = router;
