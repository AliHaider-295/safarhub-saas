const express = require("express");
const router = express.Router();
const { protect } = require("../middleware/auth.middleware")
const {
  getDistanceStats,
  getRouteUsage,
  getRoutes,
  createRoute,
  deleteRoute,
} = require("../controllers/route.controller");

// ✅ Chart APIs
router.get("/distance-stats", getDistanceStats);
router.get("/usage", getRouteUsage);

// ✅ MAIN CRUD APIs (YOU WERE MISSING THESE)
router.get("/", getRoutes);        // 🔥 FIX
router.post("/", protect, createRoute);   // 🔥 FIX
router.delete("/:id", deleteRoute); // 🔥 FIX

module.exports = router;