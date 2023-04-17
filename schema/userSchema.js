"use strict";

const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
    nombre: { type: String, required: true },
    password: { 
        type: String, 
        required: true, 
        validate: {
            validator: function(v) {
                return /^(?=.*[0-9])(?=.*[a-zA-Z]{3,}).{4,}$/.test(v);
            },
            message: props => `${props.value} no es una contraseña válida. Debe contener al menos un número y tres letras`
        }
    }
});


module.exports = mongoose.model('User', UserSchema);