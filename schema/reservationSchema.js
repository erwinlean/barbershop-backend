<<<<<<< HEAD
"use strict";

const mongoose = require('mongoose');

const Reservation = new mongoose.Schema({
    name: { type: String, required: true },
    type: { type: String, required: true },
    email: { type: String },
    celphone: { type: String, required: true },
    day: { type: String, required: true },
    hour: { type: Number, required: true },
});

Reservation.index({ day: 1, hour: 1});

module.exports = mongoose.model('Reservation', Reservation);
=======
"use strict";

>>>>>>> a546c28b4961cb1f5586276053fda358852d5c39
