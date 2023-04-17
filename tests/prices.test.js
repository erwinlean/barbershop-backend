"use strict";

const app = require('../app');
const chai = require('chai');
const chaiHttp = require('chai-http');

const { expect } = chai;
chai.use(chaiHttp);

describe('Prices API', () => {
    let authToken;

    // Este hook de loagin para poder realizar las peticiones, con el token
    beforeEach((done) => {
        chai
        .request(app)
        .post('/login')
        .send({ email: 'test@example.com', password: 'test123' })
        .end((err, res) => {
            authToken = res.body.token; // guardado token
            done();
        });
    });

    // Test para GET > /prices
    describe('GET /prices', () => {
        it('should return all prices', (done) => {
            chai
            .request(app)
            .get('/prices')
            .set('Authorization', `Bearer ${authToken}`)
            .end((err, res) => {
                expect(res).to.have.status(200);
                expect(res.body).to.be.an('array');
                done();
            });
        });
    });

    // Test para POST /prices
    describe('POST /prices', () => {
        it('should create a new price', (done) => {
            const newPrice = {
            product: 'Product Name',
            price: 100,
            };
            chai
            .request(app)
            .post('/prices')
            .set('Authorization', `Bearer ${authToken}`)
            .send(newPrice)
            .end((err, res) => {
                expect(res).to.have.status(201);
                expect(res.body).to.be.an('object');
                expect(res.body).to.have.property('id');
                done();
            });
        });
    });

    // Test para PUT > /prices/:id
    describe('PUT /prices/:id', () => {
        it('should update a price', (done) => {
            const updatedPrice = {
            product: 'Updated Product Name',
            price: 150,
            };
            chai
            .request(app)
            .put('/prices/1')
            .set('Authorization', `Bearer ${authToken}`)
            .send(updatedPrice)
            .end((err, res) => {
                expect(res).to.have.status(200);
                expect(res.body).to.be.an('object');
                expect(res.body).to.have.property('id', 1);
                expect(res.body).to.have.property('product', updatedPrice.product);
                expect(res.body).to.have.property('price', updatedPrice.price);
                done();
            });
        });
    });
});