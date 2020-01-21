let chai = require('chai');
let chaiHttp = require('chai-http');
let server = require('../app');
let should = chai.should();
let mongoose = require('mongoose');
let searchModel = require('../models/search-model');
chai.use(chaiHttp);
let dummyObjectId = '';
describe('/Restaurant Search Test', () => {

    it('expecting 20 restaurants on test start at the begining without any filter', (done) => {
        chai.request(server)
            .get('/api/restaurants/search-restaurants')
            .end((err, res) => {
                // console.log(res.body);

                res.should.have.status(200);
                // res.body.should.be.a('Array');
                res.body.should.have.length(20);
                 done();
            });
    });

    it('expecting restaurants to be fectch based on 4.2 rating', (done) => {
        chai.request(server)
            .get('/api/restaurants/search-restaurants')
            .query({ 'aggregate_rating': 4.2 })
            .end((err, res) => {
                res.should.have.status(200);
               res.body.should.be.a('array');
                res.body.should.have.length(1);

                // res.body.datalength
                done();
            });
    });

    it('expecting restaurants from Namakkal City', (done) => {
        chai.request(server)
            .get('/api/restaurants/search-restaurants')
            .query({ 'city': `Namakkal` })
            .end((err, res) => {
                res.should.have.status(200);
                res.body.should.be.a('array');
                // res.body.datalength
                done();
            });
    });

    it('expecting restaurant by using id 5dfb24272ad545c00a7c2f46', (done) => {
        chai.request(server)
            .get('/api/restaurants/search-restaurants')
            .query({ 'id': `5dfb24272ad545c00a7c2f46` })
            .end((err, res) => {
                res.should.have.status(200);
                res.body.should.be.a('array');
                // res.body.datalength
                done();
            });
    });


});