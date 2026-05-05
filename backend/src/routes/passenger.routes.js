const express = require("express");
const router = express.Router();

const {
  createPassenger,
  getPassengers,
} = require("../controllers/passenger.controller");

const { protect } = require("../middleware/auth.middleware");

// ✅ Create passenger
router.post("/", protect, createPassenger);

// ✅ Get passengers
router.get("/",protect, getPassengers);

module.exports = router;