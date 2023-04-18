"use strict";

var express = require('express');
var router = express.Router();
const profits = require("../handler/profitsHandler");
const requireToken = require ("../middleware/reqToken");
const { sanitize } = require('express-sanitizer');

router.get('/', sanitize(), requireToken, profits.getAllProfits);

module.exports = router;