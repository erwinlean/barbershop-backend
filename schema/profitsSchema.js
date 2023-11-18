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
