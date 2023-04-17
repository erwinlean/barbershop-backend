"use strict";

const Prices = require('../schema/pricesSchema');
const { sanitize } = require('express-sanitizer');

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
            const newPrice = new Prices(req.sanitize(req.body));
            const savedPrice = await newPrice.save();
            res.status(201).json(savedPrice);
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    },      
    updatePrice : async function(req, res) {
        try {
            const priceFieldsToUpdate = {};
            for (const key in req.body) {
                if (priceFieldsToUpdate.hasOwnProperty(key)) { // To check, if not work, properly, just create if statements for each property "precios" for the form field and backend Schema
                    priceFieldsToUpdate[key] = req.body[key];
                };
            };


            const updatedPrice = await Prices.findOneAndUpdate(
                { _id: req.params.id },
                req.sanitize(priceFieldsToUpdate),
                { new: true }
            );
            res.status(200).json(updatedPrice);
        } catch (error) {
            res.status(500).json({ error: error.message });
        };
    }
};