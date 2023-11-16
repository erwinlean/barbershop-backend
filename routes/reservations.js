"use strict";

var express = require('express');
var router = express.Router();
const reservation = require("../handler/reservationHandler");
const requireToken = require ("../middleware/reqToken");

router.get('/', requireToken, reservation.getReservations);

router.post('/create', requireToken, reservation.createReservation);

router.delete('/deletelast', requireToken, reservation.deleteReservation);  