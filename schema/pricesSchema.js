"use strict";

const mongoose = require('mongoose');

const pricesSchema = new mongoose.Schema({
    corte: { 
        type: String, 
        required: true,
        validate: {
            validator: function(v) {
                return /^[0-9]+$/.test(v) && v.length >= 3;
            },
            message: props => `${props.value} no es un corte válido. Debe contener al menos 3 dígitos numéricos.`
        }
    },
    corteYBarba: { 
        type: String, 
        required: true,
        validate: {
            validator: function(v) {
                return /^[0-9]+$/.test(v) && v.length >= 3;
            },
            message: props => `${props.value} no es un corte y barba válido. Debe contener al menos 3 dígitos numéricos.`
        }
    },
    barba: { 
        type: String, 
        required: true,
        validate: {
            validator: function(v) {
                return /^[0-9]+$/.test(v) && v.length >= 3;
            },
            message: props => `${props.value} no es una barba válida. Debe contener al menos 3 dígitos numéricos.`
        }
    },
    claritos: { 
        type: String, 
        required: true,
        validate: {
            validator: function(v) {
                return /^[0-9]+$/.test(v) && v.length >= 3;
            },
            message: props => `${props.value} no son unos claritos válidos. Debe contener al menos 3 dígitos numéricos.`
        }
    },
    colorGlobal: { 
        type: String, 
        required: true,
        validate: {
            validator: function(v) {
                return /^[0-9]+$/.test(v) && v.length >= 3;
            },
            message: props => `${props.value} no es un color global válido. Debe contener al menos 3 dígitos numéricos.`
        }
    },
    nutricion: { 
        type: String, 
        required: true,
        validate: {
            validator: function(v) {
                return /^[0-9]+$/.test(v) && v.length >= 3;
            },
            message: props => `${props.value} no es una nutrición válida. Debe contener al menos 3 dígitos numéricos.`
        }
    },
});

module.exports = mongoose.model('Prices', pricesSchema);