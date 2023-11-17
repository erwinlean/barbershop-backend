"use strict";

var express = require('express');
var router = express.Router();
const profits = require("../handler/profitsHandler");
const requireToken = require ("../middleware/reqToken");

router.get('/', requireToken, profits.getAllProfits);

router.delete('/deleteall', requireToken, profits.deleteAllProfits);
router.delete('/deletelast', requireToken, profits.deleteLastProfit);  

router.post('/create', requireToken, profits.createProfits);

module.exports = router;