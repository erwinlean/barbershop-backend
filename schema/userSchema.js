<<<<<<< HEAD
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


=======
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


>>>>>>> a546c28b4961cb1f5586276053fda358852d5c39
module.exports = mongoose.model('User', UserSchema);