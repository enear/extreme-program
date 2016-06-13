var chai = require('chai');
var chaiHttp = require('chai-http');
var server = require('../../app');
var should = chai.should();
var Goal = require('./goalModel');
var lib = require('../lib/lib');
var requiredFields = lib.models.getRequiredFields(Goal);

chai.use(chaiHttp);

describe("Goals", function(){
    it("Should list all goals on /api/rewards GET", function(done) {
        chai.request(server)
            .get('/api/goals')
            .end(function(err, res) {
                res.should.have.status(200);
                res.should.be.json;
                res.body.should.be.a('array');
                res.body.forEach(function(goal) {
                    lib.tests.testRequiredFields(goal, requiredFields);
                });
                done();
            });
    });

    it("Should list a single goal on /api/goals/<id> GET", function(done) {
        chai.request(server)
            .get('/api/goals')
            .end(function(err, res) {
                chai.request(server)
                .get('/api/goals/' + res.body[0]._id)
                .end(function(err, res) {
                    res.should.have.status(200);
                    res.should.be.json;
                    res.body.should.be.a('object');
                    lib.tests.testRequiredFields(res.body, requiredFields);
                    done();
                });
            });
    });

    it("Should save a new goal on /api/goals POST", function(done) {
        chai.request(server)
        .post('/api/goals')
        .send({name: "New business contact", points: 15, description: "Arrange a meeting with a new potential client"})
        .end(function(err, res) {
            res.should.have.status(200);
            res.should.be.json;
            res.should.be.a('object');
            lib.tests.testRequiredFields(res.body, requiredFields);
            done();
        });
    });
});
