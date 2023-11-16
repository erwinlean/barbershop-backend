"use strict";

const chai = require('chai');
const chaiHttp = require('chai-http');
const app = require('../app');
const User = require('../schema/userSchema');

chai.use(chaiHttp);
chai.should();

describe('Rutas de Usuarios', () => {
    beforeEach(async () => {
        // Eliminar todos los usuarios antes de cada prueba
        await User.deleteMany({});
    });

    describe('POST /users', () => {
        it('Debería crear un nuevo usuario y devolverlo con un token', async () => {
            // Realizar la solicitud de creación de usuario
            const res = await chai.request(app)
                .post('/users')
                .send({ nombre: 'newuser', password: 'newpassword123' });

            // Verificar la respuesta
            res.should.have.status(201);
            res.body.should.be.an('object');
            res.body.should.have.property('user');
            res.body.should.have.property('token');
        });

        it('Debería devolver un error de usuario ya existente si se intenta crear un usuario con un nombre de usuario existente', async () => {
            // Crear un usuario en la base de datos
            const newUser = new User({
                nombre: 'test123',
                password: 'test123'
            });
            await newUser.save();

            // Realizar la solicitud de creación de usuario con el mismo nombre de usuario
            const res = await chai.request(app)
                .post('/users')
                .send({ nombre: 'test123', password: 'test123' });

            // Verificar la respuesta
            res.should.have.status(400);
            res.body.should.be.an('object');
            res.body.should.have.property('message').equal('Este nombre de usuario ya está en uso');
        });
    });

    describe('POST /users/login', () => {
        beforeEach(async () => {
            const usuario = new User({
                nombre: 'test123',
                password: 'test123'
            });
            await usuario.save();
        });
    
        it('Debería autenticar al usuario y devolver un token', async () => {
            const res = await chai.request(app)
                .post('/users/login')
                .send({ nombre: 'test123', password: 'test123' });
        
            res.should.have.status(401);
            res.body.should.be.an('object');
            res.body.should.have.property('message').equal('Nombre de usuario o contraseña incorrectos');
        });
        
        it('Debería devolver un error de autenticación con nombre de usuario o contraseña incorrectos', async () => {
            const res = await chai.request(app)
                .post('/users/login')
                .send({ nombre: 'test123', password: 'test1234' });
        
            res.should.have.status(401);
            res.body.should.be.an('object');
            res.body.should.have.property('message').equal('Nombre de usuario o contraseña incorrectos');
        });
        
    });
});
