"use strict";

const app = require('../app');
const chai = require('chai');
const chaiHttp = require('chai-http');

const { expect } = chai;
chai.use(chaiHttp);

describe('Users routes', () => {
    // TEST - post de create user
    describe('POST /users', () => {
        it('debería crear un nuevo usuario y retornar un token', (done) => {
        chai
            .request(app)
            .post('/users')
            .send({
                name: 'Juan',
                email: 'juan@example.com',
                password: '123456',
            })
            .end((err, res) => {
                expect(res).to.have.status(200);
                expect(res.body).to.have.property('token');
                done();
            });
        });
    });

    // Test post login, para obtencion de token
    describe('POST /login', () => {
        it('debería iniciar sesión y retornar un token', (done) => {
            chai
            .request(app)
            .post('/login')
            .send({
                email: 'juan@example.com',
                password: '123456',
            })
            .end((err, res) => {
            expect(res).to.have.status(200);
            expect(res.body).to.have.property('token');
            done();
            });
        });
    });
});