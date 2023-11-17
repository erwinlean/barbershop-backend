const chai = require('chai');
const chaiHttp = require('chai-http');
const app = require('../app');
const expect = chai.expect;

chai.use(chaiHttp);

describe('Prices API', () => {
    let authToken;

    beforeEach((done) => {
        // Simula el proceso de inicio de sesión y obtén el token de autenticación
        chai.request(app)
            .post('/users/login')
            .send({ nombre: 'test123', password: 'test123' }) // Reemplaza con tus credenciales de usuario
            .end((err, res) => {
                authToken = res.body.token; // Almacena el token de autenticación en la variable
                done();
            });
            console.log(`TOKEN: ${authToken}`);
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
                    expect(res.body).to.be.an('array'); // Verifica que la respuesta sea un arreglo
                    done();
                });
        });
    });

    describe('POST /prices', () => {
        it('debería crear un nuevo precio', (done) => {
            const nuevoPrecio = {
                corte: 100,
                corteYBarba: 150,
                barba: 50,
                claritos: 200,
                colorGlobal: 300,
                nutricion: 150
            };

            chai.request(app)
                .post('/prices')
                .set('Authorization', `Bearer ${authToken}`) // Agrega el token de autenticación al encabezado Authorization
                .send(nuevoPrecio)
                .end((err, res) => {
                    expect(res).to.have.status(201);
                    expect(res.body).to.be.an('object'); // Verifica que la respuesta sea un objeto
                    expect(res.body).to.include(nuevoPrecio); // Verifica que la respuesta incluya los datos del nuevo precio
                    done();
                });
        });
    });

    describe('PUT /prices/:id', () => {
        it('debería actualizar un precio existente', (done) => {
            const precioId = 'id_del_precio_a_actualizar';
            const precioActualizado = { corte: 25 };
    
            chai.request(app)
                .put(`/prices/${precioId}`)
                .set('Authorization', `Bearer ${authToken}`) // Agrega el token de autenticación al encabezado Authorization
                .send(precioActualizado)
                .end((err, res) => {
                    expect(res).to.have.status(200);
                    expect(res.body).to.be.an('object'); // Verifica que la respuesta sea un objeto
                    // Agrega el código adicional necesario para verificar la respuesta
    
                    // Verificar que el precio actualizado tenga el valor correcto
                    expect(res.body.precio1).to.equal(25);
    
                    done();
                });
        });
    });
});
