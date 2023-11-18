"use strict";

var express = require('express');
var router = express.Router();
const pricesHandler = require("../handler/pricesHandler");
const requireToken = require ("../middleware/reqToken");

router.get('/', pricesHandler.getAllPrices);
router.post('/create', pricesHandler.createPrice);
// router.delete('/', requireToken, pricesHandler.deleteAllPrices); tested, doesnt need to delete the price, witch will modified latter, not need to create or delete
// router.post('/', requireToken, pricesHandler.disable);
router.put('/:id?', pricesHandler.updatePrice);
router.delete('/', requireToken, pricesHandler.disable);

module.exports = router;