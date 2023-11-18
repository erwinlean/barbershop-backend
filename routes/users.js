"use strict";

const express = require('express');
const router = express.Router();
const userHandler = require('../handler/userHandler');
const requireToken = require ("../middleware/reqToken");

router.post('/login', userHandler.login);
router.post('/create', userHandler.createUser);
//router.get('/', userHandler.disable);
router.get('/', userHandler.getUsers); // To remove on prod
//router.post('/', userHandler.createUser); // To remove on prod
router.delete("/delete", requireToken, userHandler.deleteUsers);

module.exports = router;