"use strict";

const User = require('../schema/userSchema');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

function createToken(user) {
    return jwt.sign({ id: user.id }, 'secretKey'/*, { expiresIn: 86400 }*/);
};

module.exports = {
    deleteUsers: async function(req, res) {
        try {
            await User.deleteMany(); // Elimina todos los usuarios en la colección
            return res.status(200).json({ message: 'Usuarios eliminados exitosamente' });
        } catch (error) {
            console.error(error);
            return res.status(500).json({ message: 'Error en el servidor' });
        }
    },
    getUsers: async function (req, res){
        try {
            //res.status(417).json({ message: "Error, users cant be access by HTTP" });
            const users = await User.find();
            res.status(200).json(users);
        } catch (err) {
            res.status(500).json({ message: err.message });
        };
    },
    login: async function (req, res) {
        try {
            const { nombre, password } = req.body;
            const user = await User.findOne({ nombre });
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
    
            const existingUser = await User.findOne({ nombre });
            if (existingUser) {
                return res.status(400).json({ message: 'Este nombre de usuario ya está en uso' });
            };
    
            if (!/^.{10,}$/.test(password)) {
                return res.status(400).json({ message: `La contraseña debe tener un minimo de longitud de 10.` });
            }else{
                const user = new User({ nombre, password });
                const salt = await bcrypt.genSalt(10);
                user.password = await bcrypt.hash(password, salt);
                await user.save();
                const token = createToken(user);
                return res.status(201).json({ user, token });
            };
        } catch (error) {
            console.error(error);
            return res.status(500).json({ message: 'Error en el servidor' });
        }
    }
    
};