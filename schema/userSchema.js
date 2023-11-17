"use strict";

const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
    nombre: { 
        type: String, 
        required: true 
    },
    password: { 
        type: String, 
        required: true, 
    }
});


module.exports = mongoose.model('User', UserSchema);