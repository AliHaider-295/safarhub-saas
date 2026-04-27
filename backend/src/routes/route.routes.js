const express = require("express");
const router = express.Router();

const { getDistanceStats } = require("../controllers/route.controller");

// ✅ Routes
router.get("/distance-stats", getDistanceStats);

// ✅ VERY IMPORTANT
module.exports = router;