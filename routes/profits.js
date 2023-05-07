"use strict";

var express = require('express');
var router = express.Router();
const profits = require("../handler/profitsHandler");
const requireToken = require ("../middleware/reqToken");

router.get('/', requireToken, profits.getAllProfits);
router.put('/', requireToken, profits.updateProfits);
router.delete('/', requireToken, profits.deleteAllProfits);
router.post('/', requireToken, profits.createProfits);

module.exports = router;