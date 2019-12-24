var express = require('express');
var router = express.Router();
const mailerCtrl = require('../controller/nodemailer-service');
router.post('/nodemailer/notify-email', async (req, res) => {

  console.log(req.body);


  let mailRequest = await mailerCtrl.sendMail(req.body)
  // console.log(mailRequest);

  res.status(mailRequest.code).json(mailRequest);

});

module.exports = router;
