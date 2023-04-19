const chai = require('chai');
const chaiHttp = require('chai-http');
const app = require('../app');
const expect = chai.expect;

chai.use(chaiHttp);

describe('Profits API', () => {
    describe('GET /', () => {
        it('should return all profits with status 200', (done) => {
            chai
            .request(app)
            .get('/profits')
            .end((err, res) => {
                expect(res).to.have.status(200);
                expect(res.body).to.be.an('array');
                done();
            });
        });
    });
});
