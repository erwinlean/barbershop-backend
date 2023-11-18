"use strict";

const mongoose = require('mongoose');
require('dotenv').config();
const { DB_CLUSTER } = process.env;

const uri = DB_CLUSTER;

mongoose.connect(uri, { useNewUrlParser: true, useUnifiedTopology: true })
.then(()=>{
    console.log("DB connected.")
}).catch((err)=>{
    console.log(err);
});

const db = mongoose.connection;

module.exports = db;