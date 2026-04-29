const express = require("express");
const router = express.Router();

const {
  createStaff,
  getStaff,
  updateStaff,
  deleteStaff,
  getStaffStats,
} = require("../controllers/staff.controller");

const { protect } = require("../middleware/auth.middleware");

// ✅ Routes
router.get("/", protect, getStaff);
router.post("/", protect, createStaff);

// ✅ PLACE THIS FIRST
router.get("/stats", protect, getStaffStats);

// dynamic routes AFTER
router.put("/:id", protect, updateStaff);
router.delete("/:id", protect, deleteStaff);
console.log(" Staff routes loaded");
module.exports = router;