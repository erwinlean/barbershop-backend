"use strict";

const Prices = require('../schema/pricesSchema');

module.exports = {
    getAllPrices: async function (req, res) {
        try {
            const prices = await Prices.find();
            res.status(200).json(prices);
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    },
    createPrice: async function (req, res) {
        const {corte, corteYBarba, barba, claritos, colorGlobal, nutricion} = req.body;

        try {
            const newPrice = new Prices({
                corte,
                corteYBarba,
                barba,
                claritos,
                colorGlobal,
                nutricion
            });
            const savedPrice = await newPrice.save();
            res.status(201).json(savedPrice);
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    },
    updatePrice: async function (req, res) {
        try {
            const { id } = req.params; // obtener el ID del parámetro de ruta
            const updatedPrice = await Prices.findOneAndUpdate(
                { _id: id }, // buscar por ID
                req.body,
                { new: true }
            );
            res.status(200).json(updatedPrice);
            console.log(updatedPrice)
        } catch (error) {
            res.status(500).json({ error: error.message });
        };
    },
    deleteAllPrices:  async function (req, res) {
        try {
            await Prices.deleteMany({});
            res.status(200).json({ message: 'Todos los precios han sido eliminados exitosamente.' });
        } catch (error) {
            res.status(500).json({ error: error.message });
        };
    }
};