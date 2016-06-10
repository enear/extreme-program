var chai = require('chai');
var chaiHttp = require('chai-http');
var server = require('../../app');
var should = chai.should();
var Reward = require('./rewardModel');
var lib = require('../lib/lib');
var requiredFields = lib.models.getRequiredFields(Reward);

chai.use(chaiHttp);

describe("Rewards", function(){
    it("Should list all rewards on /api/rewards GET", function(done) {
        chai.request(server)
            .get('/api/rewards')
            .end(function(err, res) {
                res.should.have.status(200);
                res.should.be.json;
                res.body.should.be.a('array');
                res.body.forEach(function(reward) {
                    lib.tests.testRequiredFields(reward, requiredFields);
                });
                done();
            });
    });

    it("Should list a single reward on /api/rewards/<id> GET", function(done) {
        chai.request(server)
            .get('/api/rewards')
            .end(function(err, res) {
                chai.request(server)
                .get('/api/rewards/' + res.body[0]._id)
                .end(function(err, res) {
                    res.should.have.status(200);
                    res.should.be.json;
                    res.body.should.be.a('object');
                    lib.tests.testRequiredFields(res.body, requiredFields);
                    done();
                });
            });

    });

    it("Should save a new reward on /api/rewards POST", function(done) {
        chai.request(server)
        .post('/api/rewards')
        .send({name: "Trip to Hawai", points: 5000, description: "Trip in all-included regime to Hawai"})
        .end(function(err, res) {
            res.should.have.status(200);
            res.should.be.json;
            res.should.be.a('object');
            lib.tests.testRequiredFields(res.body, requiredFields);
            done();
        });
    });
});
