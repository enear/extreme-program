var chai = require('chai');
var chaiHttp = require('chai-http');
var server = require('../../app');
var should = chai.should();
var State = require('./requestStateModel');
var lib = require('../lib/lib');
var requiredFields = lib.models.getRequiredFields(State);

chai.use(chaiHttp);

describe("Request States", function(){
    it("Should list all states on /api/states GET", function(done) {
        chai.request(server)
            .get('/api/states')
            .end(function(err, res) {
                res.should.have.status(200);
                res.should.be.json;
                res.body.should.be.a('array');
                res.body.forEach(function(state) {
                    lib.tests.testRequiredFields(state, requiredFields);
                });
                done();
            });
    });

    it("Should list a single state on /api/states/<id> GET", function(done) {
        chai.request(server)
            .get('/api/states')
            .end(function(err, res) {
                chai.request(server)
                .get('/api/states/' + res.body[0]._id)
                .end(function(err, res) {
                    res.should.have.status(200);
                    res.should.be.json;
                    res.body.should.be.a('object');
                    lib.tests.testRequiredFields(res.body, requiredFields);
                    done();
                });
            });
    });
});
