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
    }
});

// pre save-update
profitsSchema.pre('save', function(next) {
    const fechaActual = new Date();
    const fechaDocumento = this.createdAt || fechaActual;

    if (fechaDocumento.toDateString() === fechaActual.toDateString()) {
        this.ingresoDiario += this.ingresoTotal;
    } else if (fechaDocumento <= fechaActual && fechaActual <= new Date(fechaDocumento.getFullYear(), fechaDocumento.getMonth(), fechaDocumento.getDate() + 6)) {
        this.ingresoSemanal += this.ingresoTotal;
    } else if (fechaDocumento.getMonth() === fechaActual.getMonth() && fechaDocumento.getFullYear() === fechaActual.getFullYear()) {
        this.ingresoMensual += this.ingresoTotal;
    }

    next();
});

// pre update
profitsSchema.pre('findOneAndUpdate', function(next) {
    const fechaActual = new Date();
    const fechaDocumento = this._update.$set.createdAt || fechaActual;

    if (fechaDocumento.toDateString() === fechaActual.toDateString()) {
        this._update.$inc = this._update.$inc || {};
        this._update.$inc.ingresoDiario = this._update.$set.ingresoTotal;
    } else if (fechaDocumento <= fechaActual && fechaActual <= new Date(fechaDocumento.getFullYear(), fechaDocumento.getMonth(), fechaDocumento.getDate() + 6)) {
        this._update.$inc = this._update.$inc || {};
        this._update.$inc.ingresoSemanal = this._update.$set.ingresoTotal;
    } else if (fechaDocumento.getMonth() === fechaActual.getMonth() && fechaDocumento.getFullYear() === fechaActual.getFullYear()) {
        this._update.$inc = this._update.$inc || {};
        this._update.$inc.ingresoMensual = this._update.$set.ingresoTotal;
    }

    next();
});

module.exports = mongoose.model('Profits', profitsSchema);