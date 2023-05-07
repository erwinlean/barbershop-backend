"use strict";

const express = require('express');
const router = express.Router();
const userHandler = require('../handler/userHandler');
const requireToken = require ("../middleware/reqToken");

// Test user on config/corstData.js >> dbUser.username & dbUser.password

router.post('/login', userHandler.login);
//router.get('/', userHandler.getUsers); // Get to remove on prod
//router.post('/', userHandler.createUser); // Get to remove on prod
router.delete("/", requireToken, userHandler.deleteUsers);

module.exports = router;