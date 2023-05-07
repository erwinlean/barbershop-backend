"use strict";

var express = require('express');
var router = express.Router();
const pricesHandler = require("../handler/pricesHandler");
const requireToken = require ("../middleware/reqToken");

router.get('/', pricesHandler.getAllPrices);
// router.post('/', requireToken, pricesHandler.createPrice); tested, not needed, only one schema prices needed, and will be modified by PUT
//router.delete('/', requireToken, pricesHandler.deleteAllPrices); tested, doesnt need to delete the price, witch will modified latter, not need to create or delete
router.post('/', requireToken, pricesHandler.disable);
router.put('/:id?', requireToken, pricesHandler.updatePrice);
router.delete('/', requireToken, pricesHandler.disable);

module.exports = router;