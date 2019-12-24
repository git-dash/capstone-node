const localConfig = require('../config');
const nodemailer = require("nodemailer");

module.exports = {
    sendMail: async (messagePayload) => {

        console.log(`came in mail service`);
        console.log(messagePayload);


        var transporter = nodemailer.createTransport({
            service: 'gmail',
            auth: {
                user: localConfig.smtpConfig.user, // generated ethereal user
                pass: localConfig.smtpConfig.pass // generated ethereal password
            }
        });

        const mailOptions = {
            from: localConfig.smtpConfig.user, // sender address
            to: messagePayload.userEmail,// list of receivers
            subject: 'Capstone :Order confirmation Email', // Subject line
            html: `<h3> Your order has been confirmed with capstone - Restaurant: ${messagePayload.restautrantName}  <h3> <br/>
                Order Amount is: ${messagePayload.orderAmount} for ${messagePayload.foods ? messagePayload.foods.length : 0} item(s)`
        };



        const mailResp = await transporter.sendMail(mailOptions);

        console.log(mailResp.response.startsWith('250'));

        return mailResp
            .response.startsWith('250')
            ? {
                code: 200,
                message: `Mail Sent Sucessfully`,
                info: mailResp
            } : {
                code: 500,
                message: `Issue while sending mail`,
                error: mailResp
            }


    }

}