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

    it("Should save a new reward on /api/rewards POST", function(done) {
        chai.request(server)
            .post('/api/rewards')
            .send({name: "Trip to Hawai", points: 5000, description: "Trip in all-included regime to Hawai", createdBy:'user', created: new Date()})
            .end(function(err, res) {
                res.should.have.status(200);
                res.should.be.json;
                res.should.be.a('object');
                lib.tests.testRequiredFields(res.body, requiredFields);
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

    it('Should update a single reward on /api/rewards/<id> POST', function(done) {
        var totalPoints;
        chai.request(server)
            .get('/api/rewards')
            .end(function(err, res) {
                res.should.have.status(200);
                res.should.be.json;
                res.body.should.be.a('array');
                res.body[0].should.have.property('points');
                totalPoints = res.body[0].points;
                chai.request(server)
                    .post('/api/rewards/' + res.body[0]._id)
                    .send({points: totalPoints + 2})
                    .end(function(err, res) {
                        res.should.have.status(200);
                        res.should.be.json;
                        res.body.should.be.a('object');
                        res.body.points.should.to.equal(totalPoints + 2);
                        done();
                    });
            });
    });

    it("Should delete a reward on api/rewards/<id> DELETE", function(done) {
        var totalRewards = 0;
        var deletedId;
        chai.request(server)
            .get('/api/rewards')
            .end(function(err, res) {
                totalRewards = res.body.length;
                deletedId = res.body[totalRewards - 1]._id;
                chai.request(server)
                .delete('/api/rewards/' + deletedId)
                .end(function(err, res) {
                    res.should.have.status(200);
                    res.should.be.json;
                    res.body.should.be.a('object');
                    res.body._id.should.to.equal(deletedId);
                    chai.request(server)
                    .get('/api/rewards')
                    .end(function(err, res) {
                        res.body.length.should.to.equal(totalRewards - 1);
                        done();
                    });
                });
            });
    });
});
