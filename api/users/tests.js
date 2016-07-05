var chai = require('chai');
var chaiHttp = require('chai-http');
var server = require('../../app');
var should = chai.should();
var User = require('./userModel');
var lib = require('../lib/lib');
var requiredFields = lib.models.getRequiredFields(User);

chai.use(chaiHttp);

describe("Users", function(){
    it("Should list all users on /api/users GET", function(done) {
        chai.request(server)
            .get('/api/users')
            .end(function(err, res) {
                res.should.have.status(200);
                res.should.be.json;
                res.body.should.be.a('array');

                res.body.forEach(function(user) {
                    lib.tests.testRequiredFields(user, requiredFields);
                });

                done();
            });
    });


    it("Should list a single user on /api/users/<id> GET", function(done) {
        chai.request(server)
            .get('/api/users')
            .end(function(err, res) {
                chai.request(server)
                .get('/api/users/' + res.body[0]._id)
                .end(function(err, res) {
                    res.should.have.status(200);
                    res.should.be.json;
                    res.body.should.be.a('object');

                    lib.tests.testRequiredFields(res.body, requiredFields);

                    done();
                });
            });
    });


    it("Should save a new user on /api/users POST", function(done) {
        chai.request(server)
            .post('/api/users')
            .send({username: "username", email: "email@email.com", password: "123456", role: "standard"})
            .end(function(err, res) {
                res.should.have.status(200);
                res.should.be.json;
                res.should.be.a('object');

                lib.tests.testRequiredFields(res.body, requiredFields);

                done();
            });
    });


    it("Should change a user password on /api/user/<id> POST", function(done) {
        chai.request(server)
            .get('/api/users')
            .end(function(err, res) {
                res.should.have.status(200);
                res.should.be.json;
                res.body.should.be.a('array');

                var user = res.body[res.body.length-1];
                chai.request(server)
                    .post('/api/users/' + user._id)
                    .send({action: 'changePassword',password: "123456", newPassword: "thisIsAPassword"})
                    .end(function(err, res) {
                        res.should.have.status(200);
                        res.should.be.json;
                        res.should.be.a('object');

                        res.body.password.should.to.equal("thisIsAPassword");

                        done();
                    });
            });
    });


    it("Should update a user points balance on /api/user/<id> POST", function(done) {
        var pointsToUpdate = 3;
        var initialPoints;
        chai.request(server)
            .get('/api/users')
            .end(function(err, res) {
                res.should.have.status(200);
                res.should.be.json;
                res.body.should.be.a('array');

                var user = res.body[0];

                user.should.have.property('totalPoints');
                initialPoints = user.totalPoints;

                chai.request(server)
                    .post('/api/users/' + user._id)
                    .send({action: 'updatePoints', points: pointsToUpdate})
                    .end(function(err, res) {
                        res.should.have.status(200);
                        res.should.be.json;
                        res.should.be.a('object');

                        res.body.totalPoints.should.to.equal(initialPoints + pointsToUpdate);

                        done();
                    });
            });
    });


    it("Should add a new reward to a user on /api/user/<id> POST", function(done) {
        var reward = {
            name: "Toaster", points: 10, summary: "This is a toaster", createdBy: "user", created: new Date()
        };
        var totalRewards;
        var totalPoints;
        var historyLength;

        chai.request(server)
        .get('/api/users')
        .end(function(err, res) {
            res.should.have.status(200);
            res.should.be.json;
            res.body.should.be.a('array');

            var user = res.body[0];

            totalRewards = user.rewards.length;
            totalPoints = user.totalPoints;
            historyLength = user.history.length;

            chai.request(server)
            .post('/api/users/' + user._id)
            .send({action: 'addReward', newReward: reward})
            .end(function(err, res) {
                res.should.have.status(200);
                res.should.be.json;
                res.should.be.a('object');

                if(totalPoints >= reward.points) {
                    var historyItem = res.body.history[res.body.history.length - 1];

                    res.body.rewards.length.should.to.equal(totalRewards + 1);
                    res.body.totalPoints.should.to.equal(totalPoints - reward.points);
                    res.body.history.length.should.to.equal(historyLength + 1);
                    historyItem.should.have.property('operation');
                    historyItem.operation.should.to.equal('reward');
                }
                else {
                    res.body.rewards.length.should.to.equal(totalRewards);
                    res.body.history.length.should.to.equal(historyLength);
                    res.body.totalPoints.should.to.equal(totalPoints);
                }

                done();
            });
        });
    });


    it("Should add a new request to a user on /api/user/<id> POST", function(done) {
        var request = {
            name: "business case", points: 2, summary: "Write a business", comment: "I've writen a business case about stuff"
        };
        var totalRequests;
        var totalPoints;
        var historyLength;

        chai.request(server)
        .get('/api/users')
        .end(function(err, res) {
            res.should.have.status(200);
            res.should.be.json;
            res.body.should.be.a('array');

            var user = res.body[0];

            totalRequests = user.requests.length;
            totalPoints = user.totalPoints;
            historyLength = user.history.length;

            chai.request(server)
            .post('/api/users/' + user._id)
            .send({action: 'submitNewRequest', newRequest: request})
            .end(function(err, res) {
                res.should.have.status(200);
                res.should.be.json;
                res.should.be.a('object');

                var historyItem = res.body.history[res.body.history.length - 1];

                res.body.requests.length.should.to.equal(totalRequests + 1);
                res.body.history.length.should.to.equal(historyLength + 1);
                historyItem.should.have.property('operation');
                historyItem.operation.should.to.equal('request');

                done();
            });
        });
    });


    it("Should delete a user on api/users/<id> DELETE", function(done) {
        var totalUsers = 0;
        var deletedId;

        chai.request(server)
        .get('/api/users')
        .end(function(err, res) {
            totalUsers = res.body.length;
            deletedId = res.body[totalUsers - 1]._id;

            chai.request(server)
            .delete('/api/users/' + deletedId)
            .end(function(err, res) {
                res.should.have.status(200);
                res.should.be.json;
                res.body.should.be.a('object');
                res.body._id.should.to.equal(deletedId);

                chai.request(server)
                .get('/api/users')
                .end(function(err, res) {
                    res.body.length.should.to.equal(totalUsers - 1);

                    done();
                });
            });
        });
    });
});
