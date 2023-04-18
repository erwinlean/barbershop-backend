"use strict";

const Profits = require('../schema/profitsSchema');
const { sanitize } = require('express-sanitizer');

module.exports = {
    getAllProfits: async function (req, res) {
        try {
            const profits = await Profits.find();
            res.status(200).json(profits);
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    },
    updateProfits: async function (req, res, next) {
        const { ingresoDiario, ingresoSemanal, ingresoMensual, ingresoTotal } = req.body;

        // Sanitizar los datos de entrada
        const sanitizedIngresoDiario = sanitize(ingresoDiario);
        const sanitizedIngresoSemanal = sanitize(ingresoSemanal);
        const sanitizedIngresoMensual = sanitize(ingresoMensual);
        const sanitizedIngresoTotal = sanitize(ingresoTotal);

        try {
            const updatedProfits = await Profits.findOneAndUpdate(
                {},
                {
                    $set: {
                        ingresoDiario: sanitizedIngresoDiario,
                        ingresoSemanal: sanitizedIngresoSemanal,
                        ingresoMensual: sanitizedIngresoMensual,
                        ingresoTotal: sanitizedIngresoTotal
                    }
                },
                { new: true }
            );
            res.status(200).json(updatedProfits);
        } catch (error) {
            next(error);
        }
    }
};
