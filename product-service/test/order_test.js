let chai = require('chai');
let chaiHttp = require('chai-http');
let server = require('../app');
let should = chai.should();
let mongoose = require('mongoose');
let orderModel = require('../models/orderModel');
chai.use(chaiHttp);
let dummyObjectId = '';
describe('/Restaurant Order Test', () => {

    it.skip('expecting no orders on test start at the begining', (done) => {
        chai.request(server)
            .get('/orders')
            .end((err, res) => {
                res.should.have.status(200);
                res.body.should.be.a('object');
                done();
            });
    });

    it('post test', (done) => {
        chai.request(server)
            .post('/test-post')
            .send({ name: 'hi' })
            .end((err, res) => {
                console.log(res.body);

                done();
            })
    })
    it.skip('expecting new order to be placed', (done) => {

        let testOrder = new mongoose.Types.ObjectId();


        let dummyNewOrder = new orderModel({
            _id: testOrder,
            restaurantID: 19152549, //5df383e6e0594948f204747a - object id
            restautrantName: `Viluppuram Locality`,
            orderAmount: 960,
            food: [{ name: 'paneer', quantity: 3, price: 320 }],
            orderStatus: "Order",

        });
        chai.request(server)
            .post('/new-order')
            .type('application/json')
            .send(dummyNewOrder)
            // .query('id', testOrder)

            .end((err, res) => {
                console.log('post response ', res);

                res.should.have.status(200);
                res.body.should.be.a('object');
                // dummyObjectId = res
                done();
            });
    });

    it.skip('expecting existing order with id', (done) => {

        let testOrder = '5df5273090af88519c5f10f2';
        chai.request(server)
            .get('/search-order')

            .query('id', testOrder)

            .end((err, res) => {
                res.should.have.status(200);
                res.body.should.be.a('object');
                done();
            });
    });

    it.skip('expecting invalid order', (done) => {

        let testOrder = '5df5273090af88519c5f10f22';
        chai.request(server)
            .get('/order')

            .query('id', testOrder)

            .end((err, res) => {
                // console.log('data', res.body);
                res.should.have.status(404);
                res.body.should.be.a('object');
                done();
            });
    }); //.timeout(10000);
});