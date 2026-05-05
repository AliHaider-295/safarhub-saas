const express = require("express");
const router = express.Router();
const { protect } = require("../middleware/auth.middleware");

const {
  createBus,
  getBuses,
  deleteBus,
  updateBus,
} = require("../controllers/bus.controller");

// Routes
router.post("/", protect, createBus);
router.get("/", protect, getBuses);
router.delete("/:id",protect, deleteBus);
router.put("/:id",protect, updateBus);

module.exports = router;