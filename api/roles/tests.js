var chai = require('chai');
var chaiHttp = require('chai-http');
var server = require('../../app');
var should = chai.should();
var Role = require('./roleModel');
var lib = require('../lib/lib');
var requiredFields = lib.models.getRequiredFields(Role);

chai.use(chaiHttp);

describe("Roles", function(){
    it("Should list all roles on /api/roles GET", function(done) {
        chai.request(server)
            .get('/api/roles')
            .end(function(err, res) {
                res.should.have.status(200);
                res.should.be.json;
                res.body.should.be.a('array');
                res.body.forEach(function(role) {
                    lib.tests.testRequiredFields(role, requiredFields);
                });
                done();
            });
    });

    it("Should list a single role on /api/roles/<id> GET", function(done) {
        chai.request(server)
            .get('/api/roles')
            .end(function(err, res) {
                chai.request(server)
                .get('/api/roles/' + res.body[0]._id)
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
