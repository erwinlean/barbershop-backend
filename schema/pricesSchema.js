"use strict";

const mongoose = require('mongoose');

const pricesSchema = new mongoose.Schema({
    corte: { 
        type: Number, 
        required: true,
    },
    corteYBarba: { 
        type: Number, 
        required: true,
    },
    barba: { 
        type: Number, 
        required: true,
    },
    claritos: { 
        type: Number, 
        required: true,
    },
    colorGlobal: { 
        type: Number, 
        required: true,
    },
    nutricion: { 
        type: Number, 
        required: true,
    }
});

module.exports = mongoose.model('Prices', pricesSchema);