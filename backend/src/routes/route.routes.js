const express = require("express");
const router = express.Router();

const { getDistanceStats } = require("../controllers/route.controller");

router.get("/distance-stats", getDistanceStats);

module.exports = router;