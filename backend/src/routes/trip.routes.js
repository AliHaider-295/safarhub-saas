const express = require("express");
const router = express.Router();

const { createTrip, getTrips } = require("../controllers/trip.controller");

// 👉 Create trip
router.post("/", createTrip);

// 👉 Get all trips
router.get("/", getTrips);

module.exports = router;