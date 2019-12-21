const amqp = require('amqplib/callback_api');
const localConfig = require('../config');
module.exports = {

    pushMessageToTheQueue: async (queueName, message) => {

        console.log(`came here`);

        let resp2 = 'th;';

        amqp.connect(
            `${localConfig.rabitMQServiceURL}`, (error, conn) => {
                if (error) {
                    console.log(`error in connection`, error);
                }
                conn.createChannel((err, ch) => {

                    if (err) {
                        console.log(`error in connection createChannel`, err);
                    }
                    console.log('came in channel Creation');

                    // var queueName = 'purchase-order';
                    var payload = {
                        type: 2,
                        content: message
                    };

                    ch.assertQueue(queueName, { durable: true });
                    ch.sendToQueue(queueName, Buffer.from(JSON.stringify(payload)));
                    console.log(`Message send to the queue `);

                    setTimeout(() => {
                        conn.close();
                        console.log(`connection closed`);
                        resp2 = 'hi from service';
                        return resp2;

                    });

                });
            });



    },
    RabitMqSubscriber: async (queueName) => {

        console.log(`came here`);




        amqp.connect(`${localConfig.rabitMQServiceURL}`, (error, conn) => {
            if (error) {
                console.log(`error in connection`, error);
            }
            conn.createChannel((err, ch) => {
                if (err) {
                    console.log(`error in connection createChannel`, err);
                }
                console.log('came in channel Creation');

                // var queueName = 'purchase-order';

                ch.assertQueue(queueName, { durable: true });
                console.log(`Subscribed to the message Queue `);

                ch.consume(queueName, (message) => {
                    console.log(`Message Received: ${message.content}`);

                }, { noAck: true })

            })
        })



    }
}