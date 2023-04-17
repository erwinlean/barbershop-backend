"use strict";

const Prices = require('../schema/pricesSchema');

module.exports = {
    getAllPrices : async function(req, res) {
        try {
            const prices = await Prices.find();
            res.status(200).json(prices);
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    },
    createPrice : async function (req, res) {
        try {
            const newPrice = new Prices(req.body);
            const savedPrice = await newPrice.save();
            res.status(201).json(savedPrice);
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    },      
    updatePrice : async function(req, res) {
        try {
            const updatedPrice = await Prices.findOneAndUpdate(
                req.params.id,
                req.body,
                { new: true }
            );
            res.status(200).json(updatedPrice);
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    }
};