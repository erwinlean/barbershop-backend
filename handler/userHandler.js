"use strict";

const User = require('../schema/userSchema');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { sanitize } = require('express-sanitizer');

function createToken(user) {
    return jwt.sign({ id: user.id }, 'secretKey'/*, { expiresIn: 86400 }*/);
};

module.exports = {
    login: async function (req, res) {
        try {
            const { nombre, password } = req.body;
            const user = await User.findOne({ nombre: req.sanitize(nombre) });
            if (!user) {
                return res.status(401).json({ message: 'Nombre de usuario o contraseña incorrectos' });
            }
            const passwordMatch = await bcrypt.compare(password, user.password);
            if (!passwordMatch) {
                return res.status(401).json({ message: 'Nombre de usuario o contraseña incorrectos' });
            }
            const token = createToken(user);
            return res.status(200).json({ user, token });
        } catch (error) {
            console.error(error);
            return res.status(500).json({ message: 'Error en el servidor' });
        }
    },
    createUser: async function createUser (req, res) {
        try {
            const { nombre, password } = req.body;

            const existingUser = await User.findOne({ nombre: req.sanitize(nombre) });
            if (existingUser) {
                return res.status(400).json({ message: 'Este nombre de usuario ya está en uso' });
            };

            const user = new User({ nombre: req.sanitize(nombre), password: req.sanitize(password) });
            const salt = await bcrypt.genSalt(10);
            user.password = await bcrypt.hash(password, salt);
            await user.save();
            const token = createToken(user);
            return res.status(201).json({ user, token });
        } catch (error) {
            console.error(error);
            return res.status(500).json({ message: 'Error en el servidor' });
        }
    }
};