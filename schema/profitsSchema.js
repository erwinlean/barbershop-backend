<<<<<<< HEAD
"use strict";

const mongoose = require('mongoose');
const User = require("./userSchema");

const profitsSchema = new mongoose.Schema({
    entries: {
        type: Number,
        default: 0
    },
    date: {
        type: String /* Should be date, but small api doesnt care */,
        default: function(){
            let date = new Date();
            let day = date.getDate();
            let month = date.getMonth() + 1;
            let year = date.getFullYear();
            let finallyDate = `${day}/${month}/${year}`;

            return finallyDate;
        }
    },
    user:{
        type: mongoose.Schema.Types.ObjectId,
        ref: User
    }
});

module.exports = mongoose.model('Profits', profitsSchema);
=======
"use strict";

const mongoose = require('mongoose');
const User = require("./userSchema");

const profitsSchema = new mongoose.Schema({
    entries: {
        type: Number,
        default: 0
    },
    date: {
        type: String /* Should be date, but small api doesnt care */,
        default: function(){
            let date = new Date();
            let day = date.getDate();
            let month = date.getMonth() + 1;
            let year = date.getFullYear();
            let finallyDate = `${day}/${month}/${year}`;

            return finallyDate;
        }
    },
    user:{
        type: mongoose.Schema.Types.ObjectId,
        ref: User
    }
});

module.exports = mongoose.model('Profits', profitsSchema);User
>>>>>>> a546c28b4961cb1f5586276053fda358852d5c39
