// Optional. Set the node environment to test.
//process.env.NODE_ENV = 'test';

let chai = require('chai')
let jwt = require('jsonwebtoken')
let chaiHttp = require('chai-http')
let server = require('../system/server.js')
let should = chai.should()

chai.use(chaiHttp)

const config = require('../system/config.js')

let testdata = {
	"username":"dummy",
	"password":"dummy123",
}

var token = jwt.sign(testdata, config.settings.secret, {
				 expiresIn: 86400 // expires in 24 hours
});

var globalDummyToken = token;

describe('Routes', function() {
	this.timeout(20000);
   describe('/POST login', () => {
      it('it should return token', (done) => {
        let cred = {
            username: testdata.username,
            password: testdata.password
        }
        chai.request(server)
            .post('/login')
            .send(cred)
            .end((err, res) => {
                res.should.have.status(200);
                res.body.should.be.a('object');
                res.body.should.have.property('token').eql(globalDummyToken);
              done();
            });
      });
	});

	describe('/POST thumbnail', () => {
      it('it should return check flag', (done) => {
        let data = {
            "uri": "https://upload.wikimedia.org/wikipedia/commons/2/26/Epic.png",
			"token":globalDummyToken
        }
        chai.request(server)
            .post('/thumbnail')
            .send(data)
            .end((err, res) => {
                res.should.have.status(200);
                res.body.should.be.a('object');
                res.body.should.have.property('check');
              done();
            });
      });
	});

	describe('/POST patch', () => {
      it('it should return check flag', (done) => {
        let data = {
            "object": '{"baz": "qux","foo": "bar"}',
            "patch": '{ "op": "replace", "path": "/baz", "value": "boo" }',
						"token":globalDummyToken
        }
        chai.request(server)
            .post('/patch')
            .send(data)
            .end((err, res) => {
                res.should.have.status(200);
                res.body.should.be.a('object');
                res.body.should.have.property('check');
              done();
            });
      });
	});
});
