"use strict";

var express = require('express');
var router = express.Router();


module.exports = {
    index: async function (req, res, next){
        try {
            res.status(417).json({ message: "Error, bad path, missing /api" });
        } catch (err) {
            res.status(500).json({ message: err.message });
        };
    },
    indexApi: async function (req, res, next){
        try {
            res.status(417).json({ message: "Error, bad path" });
        } catch (err) {
            res.status(500).json({ message: err.message });
        };
    }
};