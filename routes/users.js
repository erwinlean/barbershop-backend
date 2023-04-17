"use strict";

const express = require('express');
const router = express.Router();
const userHandler = require('../handler/userHandler');
const { sanitize } = require('express-sanitizer');

router.post('/login', sanitize(), userHandler.login);
router.post('/', sanitize(), userHandler.createUser);

module.exports = router;