"use strict";

var express = require('express');
var router = express.Router();
const reservationHandler = require("../handler/reservationHandler");

router.post('/', reservationHandler.postReservation);

router.get('/', reservationHandler.getAllReservations);

router.delete('/deleteReservation/:name', reservationHandler.deleteUserRes);
router.delete("/deleteAll", reservationHandler.deleteEverything);


module.exports = router;
