let chai = require('chai');
let chaiHttp = require('chai-http');
let server = require('../app');
let should = chai.should();
let mongoose = require('mongoose');
let searchModel = require('../models/search-model');
chai.use(chaiHttp);
let dummyObjectId = '';
describe('/Restaurant Search Test', () => {

    it.skip('expecting 20 restaurants on test start at the begining', (done) => {
        chai.request(server)
            .get('/api/search-restaurants')
            .query({
                id : ''
            })
            .end((err, res) => {
                res.should.have.status(200);
                res.body.should.be.a('object');
                // res.body.datalength
                done();
            });
    });

    it.skip('expecting 20 restaurants on test start at the begining', (done) => {
        chai.request(server)
            .get('/api/search-restaurants')
            .end((err, res) => {
                res.should.have.status(200);
                res.body.should.be.a('object');
                // res.body.datalength
                done();
            });
    });


});