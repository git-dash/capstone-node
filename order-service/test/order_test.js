let chai = require('chai');
let chaiHttp = require('chai-http');
let server = require('../app');
let should = chai.should();
let mongoose = require('mongoose');
let orderModel = require('../models/orderModel');
chai.use(chaiHttp);
var dummyObjectId;
describe('/Restaurant Order Test', () => {

    it('expecting no orders on test start at the begining', (done) => {
        chai.request(server)
            .get('/api/orders')
            .end((err, res) => {
                res.should.have.status(200);
                res.body.should.be.a('object');
                done();
            });
    });


    it('expecting new order to be placed', (done) => {

        let testOrder = new mongoose.Types.ObjectId();


        let dummyNewOrder = {
            _id: testOrder,
            restaurantID: 19152549, //5df383e6e0594948f204747a - object id
            restautrantName: `Viluppuram Locality`,
            orderAmount: 960,
            foods: [{ name: 'paneer', quantity: 3, price: 320 }],
            userEmail: 'learn.music.med@gmail.com'

        };
        chai.request(server)
            .post('/api/new-order')
            .type('application/json')
            .send(dummyNewOrder)
            // .query('id', testOrder)

            .end((err, res) => {
                console.log('post response ', res);

                res.should.have.status(200);

                res.body.data.mailInfo.message.should.be.eql('Mail Sent Sucessfully');
                res.body.data.mailInfo.code.should.be.eql(200);
                res.body.data.orderInfo.orderAmount.should.be.eql(960);

                dummyObjectId = res.body.data.orderInfo._id;
                // res.body.data.orderInfo._id.should.be.eql(dummyNewOrder._id);

                done();
            });
    });

    it('expecting newly added order to be exist in the record', (done) => {

        chai.request(server)
            .get('/api/search-order')

            .query({ 'id': dummyObjectId })

            .end((err, res) => {
                res.should.have.status(200);
                res.body.should.be.a('object');
                done();
            });
    });

    it('expecting updating new food items for previously added = order', (done) => {

        chai.request(server)
            .put(`/api/update-order`)
            .query({ 'id': dummyObjectId })
            .send({
                foods: [{ name: 'paneer', quantity: 4, price: 320 },
                { name: 'chicken', quantity: 1, price: 220 }],

            })

            .end((err, res) => {
                res.should.have.status(200);
                res.body.should.be.a('object');
                done();
            });
    });

    it('expecting more foods in previously updated order to be exist in the record', (done) => {

        chai.request(server)
            .get('/api/search-order')

            .query({ 'id': dummyObjectId })

            .end((err, res) => {
                res.should.have.status(200);
                res.body.should.be.a('object');
                res.body.data.foods.should.have.length(2);
                done();
            });
    });

    it('expecting more foods in previously updated order to be exist in the record', (done) => {

        chai.request(server)
            .delete('/api/remove-order')

            .query({ 'id': dummyObjectId })

            .end((err, res) => {
                res.should.have.status(200);
                res.body.should.be.a('object');
                // res.body.data.foods.should.have.legth(2);
                done();
            });
    });

    it('expecting invalid order', (done) => {

        chai.request(server)
            .get('/order')

            .query({ 'id': dummyObjectId })

            .end((err, res) => {
                // console.log('data', res.body);
                res.should.have.status(404);
                res.body.should.be.a('object');
                done();
            });
    }); //.timeout(10000);
});