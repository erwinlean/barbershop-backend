const chai = require('chai');
const chaiHttp = require('chai-http');
const app = require('../app');
const expect = chai.expect;

chai.use(chaiHttp);

describe('Prices API', () => {
    beforeEach((done) => {
        done();
    });

    afterEach((done) => {
        done();
    });

    describe('GET /prices', () => {
        it('debería obtener todos los precios', (done) => {
            chai.request(app)
                .get('/prices')
                .end((err, res) => {
                    expect(res).to.have.status(200);
                    expect(res.body).to.be.an('array');
                    done();
                });
        });
    });

    describe('POST /prices', () => {
        it('debería crear un nuevo precio', (done) => {
            chai.request(app)
                .post('/prices')
                .send({ precio1: 23 })
                .end((err, res) => {
                    expect(res).to.have.status(201);
                    expect(res.body).to.be.an('object');
                    done();
                });
        });
    });

    describe('PUT /prices/:id', () => {
        it('debería actualizar un precio existente', (done) => {
            const precioId = 'id_del_precio_a_actualizar';
            chai.request(app)
                .put(`/prices/${precioId}`)
                .send({ precio1:25 })
                .end((err, res) => {
                    expect(res).to.have.status(200);
                    expect(res.body).to.be.an('object');
                    done();
                });
        });
    });
});
