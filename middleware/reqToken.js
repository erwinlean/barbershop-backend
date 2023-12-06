"use strict";

const jwt = require('jsonwebtoken');

function requireToken(req, res, next) {
    const authHeader = req.headers['Authorization'];

    const token = authHeader && authHeader.split(' ')[1];
    if (!token) {
        return res.status(401).json({ message: 'No se proporcionó un token de autenticación' });
    }

    jwt.verify(token, 'tizziano', (err, decoded) => {
        if (err) {
            return res.status(403).json({ message: 'Token de autenticación inválido' });
        }

        req.userId = decoded.id;
        next();
    });
}

module.exports = requireToken;