"use strict";

const chai = require('chai');
const chaiHttp = require('chai-http');
const app = require('../app');
const indexHandler = require('../handler/indexHandler');

// Configura Chai para usar Chai HTTP
chai.use(chaiHttp);
const expect = chai.expect;

describe('Pruebas de la API', () => {
    it('GET / devuelve una respuesta de error con el mensaje correcto', async () => {
        const response = await chai.request(app).get('/');
        expect(response).to.have.status(417);
        expect(response.body).to.deep.equal({ message: 'Error, bad path' });
    });
});
