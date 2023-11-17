<<<<<<< HEAD
"use strict";

var express = require('express');
var router = express.Router();
const reservationHandler = require("../handler/reservationHandler");

router.post('/', reservationHandler.postReservation);

router.get('/', reservationHandler.getAllReservations);

router.delete('/deleteReservation/:name', reservationHandler.deleteUserRes);
router.delete("/deleteAll", reservationHandler.deleteEverything);


module.exports = router;
=======
"use strict";

var express = require('express');
var router = express.Router();
const reservation = require("../handler/reservationHandler");
const requireToken = require ("../middleware/reqToken");

router.get('/', requireToken, reservation.getReservations);

router.post('/create', requireToken, reservation.createReservation);

router.delete('/deletelast', requireToken, reservation.deleteReservation);  
>>>>>>> a546c28b4961cb1f5586276053fda358852d5c39
