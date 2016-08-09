var chai = require('chai');
var chaiHttp = require('chai-http');
var server = require('../../app');
var should = chai.should();
var Settings = require('./settingsModel');
var lib = require('../lib/lib');
var requiredFields = lib.models.getRequiredFields(Settings);

chai.use(chaiHttp);

describe("Settings", function(){

  it("Should list the settings at /api/settings GET", function(done) {
    chai.request(server)
      .get('/api/settings')
      .end(function(err, res) {
          res.should.have.status(200);
          res.should.be.json;
          res.body.should.be.a('object');
          lib.tests.testRequiredFields(res.body, requiredFields);
          done();
      });
  });
});

