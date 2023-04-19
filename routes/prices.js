"use strict";

var express = require('express');
var router = express.Router();
const pricesHandler = require("../handler/pricesHandler");
const requireToken = require ("../middleware/reqToken");

router.get('/', pricesHandler.getAllPrices);
router.post('/', requireToken, pricesHandler.createPrice);
router.put('/', requireToken, pricesHandler.updatePrice);
router.delete('/', requireToken, pricesHandler.deleteAllPrices);

module.exports = router;