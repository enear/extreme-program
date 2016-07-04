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
        .send({name: "New business contact", points: 15, summary: "Arrange a meeting with a new potential client", description:"Arrange a meeting with a brand new customer that can provide some financial cashflow to the company",})
        .end(function(err, res) {
            res.should.have.status(200);
            res.should.be.json;
            res.should.be.a('object');

            lib.tests.testRequiredFields(res.body, requiredFields);

            done();
        });
    });


    it('Should update a single goal on /api/goals/<id> POST', function(done) {
        var totalPoints;

        chai.request(server)
            .get('/api/goals')
            .end(function(err, res) {
                res.should.have.status(200);
                res.should.be.json;
                res.body.should.be.a('array');

                var goal = res.body[0];

                goal.should.have.property('points');

                totalPoints = goal.points;

                chai.request(server)
                    .post('/api/goals/' + goal._id)
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


    it("Should delete a goal on api/goals/<id> DELETE", function(done) {
        var totalGoals = 0;
        var deletedId;

        chai.request(server)
        .get('/api/goals')
        .end(function(err, res) {
            totalGoals = res.body.length;
            deletedId = res.body[totalGoals - 1]._id;

            chai.request(server)
            .delete('/api/goals/' + deletedId)
            .end(function(err, res) {
                res.should.have.status(200);
                res.should.be.json;
                res.body.should.be.a('object');

                res.body._id.should.to.equal(deletedId);

                chai.request(server)
                    .get('/api/goals')
                    .end(function(err, res) {
                        res.body.length.should.to.equal(totalGoals - 1);

                        done();
                    });
            });
        });
    });
});
