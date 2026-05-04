const express = require("express");
const router = express.Router();

const { createTrip, getTrips,getTripsSummary} = require("../controllers/trip.controller");
const { protect } = require("../middleware/auth.middleware");

console.log("🔥 TRIP ROUTES ACTIVE");

router.post("/", protect, createTrip);
router.get("/", protect, getTrips);
router.get("/summary", protect, getTripsSummary);

module.exports = router;