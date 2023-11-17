<<<<<<< HEAD
"use strict";

const Profits = require('../schema/profitsSchema');
const User = require("../schema/userSchema");

module.exports = {
    getAllProfits: async function (req, res) {
        try {
            const profits = await Profits.find();
            return res.status(200).json(profits);

        } catch (error) {
            return res.status(500).json({ error: error.message });
        };
    },

    deleteAllProfits: async function (req, res) {
        try {
            await Profits.deleteMany();
            return res.status(200).json({ message: "Todos los registros de Profits han sido eliminados." });

        } catch (error) {
            return res.status(500).json({messsage: error.message});
        };
    },

    createProfits: async function (req, res, next) {
        try {
            const { entries, name } = req.body;

            const currentUser = User.findOne({name});

            if(!entries || !currentUser){
                return res.status(401).json({message: "missing argument"})
            };

            const newProfits = new Profits({
                entries,
                user: currentUser._id,
            });

            const savedProfits = await newProfits.save();
            return res.status(200).json(savedProfits);
        } catch (error) {
            return res.status(500).json({messsage: error.message});
        };
    },

    deleteLastProfit: async function (req, res) {
        try {
            const lastProfit = await Profits.findOne().sort({$natural:-1}).limit(1);

            if (!lastProfit) {
                return res.status(404).json({ message: "No profits found." });
            };

            await lastProfit.deleteOne();
            return res.status(200).json({ message: "Last profit has been deleted." });
        } catch (error) {
            return res.status(500).json({ error: error.message });
        };
    },
=======
"use strict";

const Profits = require('../schema/profitsSchema');
const User = require("../schema/userSchema");

module.exports = {
    getAllProfits: async function (req, res) {
        try {
            const profits = await Profits.find();
            return res.status(200).json(profits);

        } catch (error) {
            return res.status(500).json({ error: error.message });
        };
    },

    deleteAllProfits: async function (req, res) {
        try {
            await Profits.deleteMany();
            return res.status(200).json({ message: "Todos los registros de Profits han sido eliminados." });

        } catch (error) {
            return res.status(500).json({messsage: error.message});
        };
    },

    createProfits: async function (req, res, next) {
        try {
            const { entries, name } = req.body;

            const currentUser = User.findOne({name});

            if(!entries || !currentUser){
                return res.status(401).json({message: "missing argument"})
            };

            const newProfits = new Profits({
                entries,
                user: currentUser._id,
            });

            const savedProfits = await newProfits.save();
            return res.status(200).json(savedProfits);
        } catch (error) {
            return res.status(500).json({messsage: error.message});
        };
    },

    deleteLastProfit: async function (req, res) {
        try {
            const lastProfit = await Profits.findOne().sort({$natural:-1}).limit(1);

            if (!lastProfit) {
                return res.status(404).json({ message: "No profits found." });
            };

            await lastProfit.deleteOne();
            return res.status(200).json({ message: "Last profit has been deleted." });
        } catch (error) {
            return res.status(500).json({ error: error.message });
        };
    },
>>>>>>> a546c28b4961cb1f5586276053fda358852d5c39
};