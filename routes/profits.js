"use strict";

var express = require('express');
var router = express.Router();
const profits = require("../handler/profitsHandler");
const requireToken = require ("../middleware/reqToken");

router.get('/', requireToken, profits.getAllProfits);
//router.put('/', requireToken, profits.updateProfits); // No needed, all the data will be  mannagment in the fronend to show beter UI
//router.delete('/deleteall', requireToken, profits.deleteAllProfits); // this will be commented letter on the prod
router.put('/', requireToken, profits.disable);
router.delete('/deleteall', requireToken, profits.disable);
router.delete('/deletelast', requireToken, profits.deleteLastProfit);  
router.post('/', requireToken, profits.createProfits);

module.exports = router;