"use strict";

const express = require('express');
const router = express.Router();
const userHandler = require('../handler/userHandler');

router.post('/login', userHandler.login);
router.post('/', userHandler.createUser);

module.exports = router;