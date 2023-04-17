"use strict";

var express = require('express');
var router = express.Router();
const pricesHandler = require("../handler/pricesHandler");
const requireToken = require ("../middleware/reqToken");
const { sanitize } = require('express-sanitizer');

router.get('/', pricesHandler.getAllPrices);
router.post('/', sanitize(), requireToken, pricesHandler.createPrice);
router.put('/:id', sanitize(), requireToken, pricesHandler.updatePrice);

module.exports = router;