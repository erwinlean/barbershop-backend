"use strict";

const mongoose = require('mongoose');

const profitsSchema = new mongoose.Schema({
    ingresoDiario: {
        type: Number,
        default: 0
    },
    ingresoSemanal: {
        type: Number,
        default: 0
    },
    ingresoMensual: {
        type: Number,
        default: 0
    },
    ingresoTotal: {
        type: Number,
        default: 0
    },
    fecha: {
        type: String,
        default: function(){
            let date = new Date();
            let day = date.getDate();
            let month = date.getMonth() + 1;
            let year = date.getFullYear();
            let finallyDate = `${day}/${month}/${year}`;

            console.log(finallyDate);

            return finallyDate;
        }
    }
});

module.exports = mongoose.model('Profits', profitsSchema);