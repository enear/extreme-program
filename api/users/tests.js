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

    it("Should delete a user on api/users/<id> DELETE", function(done) {
        var totalUsers = 0;
        chai.request(server)
        .get('/api/users')
        .end(function(err, res) {
            totalUsers = res.body.length;
            chai.request(server)
            .delete('/api/users/' + res.body[totalUsers - 1]._id)
            .end(function(err, res) {
                res.should.have.status(200);
                res.should.be.json;
                res.body.should.be.a('object');
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
