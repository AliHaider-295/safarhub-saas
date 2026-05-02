const express = require("express");
const router = express.Router();

const { createTrip, getTrips } = require("../controllers/trip.controller");
const { protect } = require("../middleware/auth.middleware");

console.log("🔥 TRIP ROUTES ACTIVE");

router.post("/", protect, createTrip);
router.get("/", protect, getTrips);

module.exports = router;