"use strict";

const Profits = require('../schema/profitsSchema');

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

        try {
            // Eliminar el campo existente antes de realizar la actualización
            await Profits.updateOne({}, { $unset: { ingresoDiario: 1 } });

            const updatedProfits = await Profits.findOneAndUpdate(
                {},
                {
                    $set: {
                        nuevoIngresoDiario: ingresoDiario,
                        ingresoSemanal: ingresoSemanal,
                        ingresoMensual: ingresoMensual,
                        ingresoTotal: ingresoTotal
                    }
                },
                { new: true }
            );
            res.status(200).json(updatedProfits);
        } catch (error) {
            next(error);
        }
    },
    deleteAllProfits: async function (req, res) {
        try {
            await Profits.deleteMany();
            res.status(200).json({ message: "Todos los registros de Profits han sido eliminados." });
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    },
    createProfits: async function (req, res, next) {
        const { ingresoDiario, ingresoSemanal, ingresoMensual, ingresoTotal } = req.body;

        try {
            const newProfits = new Profits({
                ingresoDiario,
                ingresoSemanal,
                ingresoMensual,
                ingresoTotal
            });
            const savedProfits = await newProfits.save();
            res.status(200).json(savedProfits);
        } catch (error) {
            next(error);
        }
    },
    deleteLastProfit: async function (req, res) {
        try {
            const lastProfit = await Profits.findOne().sort({$natural:-1}).limit(1);
            if (!lastProfit) {
                return res.status(404).json({ message: "No profits found." });
            }
            await lastProfit.deleteOne();
            res.status(200).json({ message: "Last profit has been deleted." });
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    },
    disable: async function (req, res, next){
        try {
            res.status(417).json({ message: "This path is disable in prod." });
        } catch (err) {
            res.status(500).json({ message: err.message });
        };
    }
};