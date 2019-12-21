const localConfig = require('../config');
const nodemailer = require("nodemailer");

module.exports = {
    sendMail: async (messagePayload) => {

        console.log(`came in mail service`);
        console.log(messagePayload);

        // Generate test SMTP service account from ethereal.email
        // Only needed if you don't have a real mail account for testing
        // let testAccount = await nodemailer.createTestAccount();

        // create reusable transporter object using the default SMTP transport
        let transporter = nodemailer.createTransport({
            host: "some-host",
            port: 25,
            secure: false, // true for 465, false for other ports
            auth: {
                user: `somekey`, // generated ethereal user
                pass: 'somepass' // generated ethereal password
            },
            tls: {
                rejectUnauthorized: false
            }
        });

        // let testAccount = await nodemailer.createTestAccount();

        // // create reusable transporter object using the default SMTP transport
        // let transporter = nodemailer.createTransport({
        //     host: "smtp.ethereal.email",
        //     port: 587,
        //     secure: false, // true for 465, false for other ports
        //     auth: {
        //         user: testAccount.user, // generated ethereal user
        //         pass: testAccount.pass // generated ethereal password
        //     },
        //     tls: {
        //         rejectUnauthorized: false
        //     }
        // });

        // send mail with defined transport object
        let info = await transporter.sendMail({
            from: '"Fred Foo 👻" <bar@email.com>', // sender address
            to: messagePayload.to,//"bar@example.com, baz@example.com", // list of receivers
            subject: "Hello ✔", // Subject line
            text: "Hello world?", // plain text body
            html: "<b>Hello world?</b>" // html body
        });

        console.log("Message sent: %s", info.messageId);
        // Message sent: <b658f8ca-6296-ccf4-8306-87d57a0b4321@example.com>

        // Preview only available when sending through an Ethereal account
        console.log("Preview URL: %s", nodemailer.getTestMessageUrl(info));
        // Preview URL: https://ethereal.email/message/WaQKMgKddxQDoou...
        return {
            'info': info,
            'previewURL': nodemailer.getTestMessageUrl(info)
        };
    }

}