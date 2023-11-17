<<<<<<< HEAD
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
    updatePrice: async function (req, res) { // Update the last price if id not specified (the cant access to the id so...)
        try {
            let query = {};
            if (req.params.id) {
                query = { _id: req.params.id };
            } else {
                query = {};
            };
            const updatedPrice = await Prices.findOneAndUpdate(
                query,
                req.body,
                { new: true }
            );
            res.status(200).json(updatedPrice);
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
    },
    disable: async function (req, res, next){
        try {
            res.status(417).json({ message: "This path is disable in prod." });
        } catch (err) {
            res.status(500).json({ message: err.message });
        };
    }
=======
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
    updatePrice: async function (req, res) { // Update the last price if id not specified (the cant access to the id so...)
        try {
            let query = {};
            if (req.params.id) {
                query = { _id: req.params.id };
            } else {
                query = {};
            };
            const updatedPrice = await Prices.findOneAndUpdate(
                query,
                req.body,
                { new: true }
            );
            res.status(200).json(updatedPrice);
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
    },
    disable: async function (req, res, next){
        try {
            res.status(417).json({ message: "This path is disable in prod." });
        } catch (err) {
            res.status(500).json({ message: err.message });
        };
    }
>>>>>>> a546c28b4961cb1f5586276053fda358852d5c39
};