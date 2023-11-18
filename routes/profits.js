"use strict";

var express = require('express');
var router = express.Router();
const profits = require("../handler/profitsHandler");
const requireToken = require ("../middleware/reqToken");

router.get('/', profits.getAllProfits);

router.delete('/deleteall', profits.deleteAllProfits);
router.delete('/deletelast', profits.deleteLastProfit);  

router.post('/create', profits.createProfits);

module.exports = router;