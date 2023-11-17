<<<<<<< HEAD
"use strict";

var express = require('express');
var router = express.Router();
const profits = require("../handler/profitsHandler");
const requireToken = require ("../middleware/reqToken");

router.get('/', requireToken, profits.getAllProfits);

router.delete('/deleteall', requireToken, profits.deleteAllProfits);
router.delete('/deletelast', requireToken, profits.deleteLastProfit);  

router.post('/create', requireToken, profits.createProfits);

=======
"use strict";

var express = require('express');
var router = express.Router();
const profits = require("../handler/profitsHandler");
const requireToken = require ("../middleware/reqToken");

router.get('/', requireToken, profits.getAllProfits);

router.delete('/deleteall', requireToken, profits.deleteAllProfits);
router.delete('/deletelast', requireToken, profits.deleteLastProfit);  

router.post('/create', requireToken, profits.createProfits);

>>>>>>> a546c28b4961cb1f5586276053fda358852d5c39
module.exports = router;