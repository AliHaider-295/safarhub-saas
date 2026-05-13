const express = require("express");

const router = express.Router();

const {
  createBooking,
  getBookings,
  getBookingById,
  updateBooking,
  deleteBooking,
  getBookingSummary,
  exportBookings,
} = require(
  "../controllers/booking.controller"
);

const {
  protect,
} = require(
  "../middleware/auth.middleware"
);

// CREATE BOOKING
router.post(
  "/",
  protect,
  createBooking
);

// BOOKING SUMMARY
router.get(
  "/summary",
  protect,
  getBookingSummary
);

// EXPORT BOOKINGS
router.get(
  "/export",
  protect,
  exportBookings
);

// GET ALL BOOKINGS
router.get(
  "/",
  protect,
  getBookings
);

// GET SINGLE BOOKING
router.get(
  "/:id",
  protect,
  getBookingById
);

// UPDATE BOOKING
router.put(
  "/:id",
  protect,
  updateBooking
);

// DELETE BOOKING
router.delete(
  "/:id",
  protect,
  deleteBooking
);

module.exports = router;