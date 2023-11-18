"use strict";

const Reservation = require('../schema/reservationSchema');

module.exports = {
    postReservation: async function(req, res ,next){
        try {
            const existingReservation = await Reservation.findOne({ day: req.body.day, hour: req.body.hour, type:req.body.type}).select("_id");

            if (existingReservation) {
                return res.status(400).json({ message: "This date & hour is already taken" });
            };

            const reservation = new Reservation({ 
                name: req.body.name, 
                email: req.body.email,  
                type: req.body.type, 
                celphone: req.body.celphone,  
                day: req.body.day,  
                hour: req.body.hour 
            });

            // Mannage timing in the frontend

            await reservation.save();
            return res.status(201).json(reservation);
        } catch (err) {
            return res.status(400).json({ message: err.message });
        };
    },

    getAllReservations: async function(req, res, next) {
        try {
            const reservations = await Reservation.find();

            const groupedReservations = reservations.reduce((groupedReserv, reservation) => {
                const { name, day, hour, type} = reservation;
                if (!groupedReserv[name]) {
                    groupedReserv[name] = [];
                };

                groupedReserv[name].push({ day, hour, type});

                return groupedReserv;
            }, {});

            res.json(groupedReservations);

        } catch (err) {
            return res.status(500).json({ message: err.message });
        };
    },

    deleteUserRes: async function(req, res, next) {
        try {
            const reservation = await Reservation.findOneAndDelete("name");

            if (!reservation) {
                return res.status(404).json({ message: "Reservation not found" });
            };

            res.json({ message: "Reservation deleted" });
        } catch (err) {
            return res.status(500).json({ message: err.message });
        };
    },
    
    deleteEverything: async function(req, res, next) {
        try {
            await Reservation.deleteMany({});

            res.json({ message: "All reservations deleted" });
        } catch (err) {
            return res.status(500).json({ message: err.message });
        };
    }
};
