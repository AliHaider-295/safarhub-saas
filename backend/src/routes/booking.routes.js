const express = require("express");

const router = express.Router();

const {
  createBooking,
  getBookings,
  getBookingSummary,
} = require(
  "../controllers/booking.controller"
);

const {
  protect,
} = require(
  "../middleware/auth.middleware"
);

router.post(
  "/",
  protect,
  createBooking
);

router.get(
  "/",
  protect,
  getBookings
);

router.get(
  "/summary",
  protect,
  getBookingSummary
);

module.exports = router;