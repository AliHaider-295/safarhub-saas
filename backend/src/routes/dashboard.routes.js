const express = require("express");
const router = express.Router();

const {
  getDashboardStats,
  getRecentTrips,
  getChartData,
} = require("../controllers/dashboard.controller");

const { protect } = require("../middleware/auth.middleware");

// ✅ ONLY ONE STATS ROUTE (FIXED)
router.get("/stats", protect, getDashboardStats);

// ✅ ALSO PROTECT THESE (VERY IMPORTANT)
router.get("/recent-trips", protect, getRecentTrips);
router.get("/chart", protect, getChartData);

module.exports = router;