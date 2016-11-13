var chai = require('chai');
var chaiHttp = require('chai-http');
var server = require('../app');
var should = chai.should();

chai.use(chaiHttp);

describe("Login", function() {
    it("Should login a user at /login POST", function(done) {
        chai.request(server)
        .get('/api/users')
        .end(function(err, res) {
            res.should.have.status(200);
            res.should.be.json;
            res.body.should.be.a('array');

            res.body.forEach(function(user) {
                if(user.email === 'tester@test.com') {
                    chai.request(server)
                    .post('/login')
                    .send({email: user.email, password: user.password})
                    .end(function(err, res) {

                        done();
                    });
                }
            });
        });

    });
});
