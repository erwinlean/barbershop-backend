"use strict";

const mongoose = require('mongoose');

const profitsSchema = new mongoose.Schema({
    ingresoDiario: {
        type: String,
        match: /^[0-9]+$/,
        default: "0"
    },
    ingresoSemanal: {
        type: String,
        match: /^[0-9]+$/,
        default: "0"
    },
    ingresoMensual: {
        type: String,
        match: /^[0-9]+$/,
        default: "0"
    },
    ingresoTotal: {
        type: String,
        match: /^[0-9]+$/,
        default: "0"
    }
});

// Hook antes de guardar o actualizar
profitsSchema.pre('save', { document: false }, function(next) {
    const fechaActual = new Date();
    const fechaDocumento = this.createdAt || fechaActual;

    // Comparar si la fecha del documento es del mismo día que la fecha actual
    if (fechaDocumento.toDateString() === fechaActual.toDateString()) {
        this.ingresoDiario = this.ingresoTotal;
    } else if (fechaDocumento <= fechaActual && fechaActual <= new Date(fechaDocumento.getFullYear(), fechaDocumento.getMonth(), fechaDocumento.getDate() + 6)) {
        // Comparar si la fecha del documento está dentro de la misma semana que la fecha actual
        this.ingresoSemanal = this.ingresoTotal;
    } else if (fechaDocumento.getMonth() === fechaActual.getMonth() && fechaDocumento.getFullYear() === fechaActual.getFullYear()) {
        // Comparar si la fecha del documento está dentro del mismo mes que la fecha actual
        this.ingresoMensual = this.ingresoTotal;
    }

    next();
});

// Hook antes de actualizar
profitsSchema.pre('findOneAndUpdate', { document: false }, function(next) {
    const fechaActual = new Date();
    const fechaDocumento = this._update.$set.createdAt || fechaActual;

    // Comparar si la fecha del documento es del mismo día que la fecha actual
    if (fechaDocumento.toDateString() === fechaActual.toDateString()) {
        this._update.$set.ingresoDiario = this._update.$set.ingresoTotal;
    } else if (fechaDocumento <= fechaActual && fechaActual <= new Date(fechaDocumento.getFullYear(), fechaDocumento.getMonth(), fechaDocumento.getDate() + 6)) {
        // Comparar si la fecha del documento está dentro de la misma semana que la fecha actual
        this._update.$set.ingresoSemanal = this._update.$set.ingresoTotal;
    } else if (fechaDocumento.getMonth() === fechaActual.getMonth() && fechaDocumento.getFullYear() === fechaActual.getFullYear()) {
        // Comparar si la fecha del documento está dentro del mismo mes que la fecha actual
        this._update.$set.ingresoMensual = this._update.$set.ingresoTotal;
    }

    next();
});

module.exports = mongoose.model('Profits', profitsSchema);