const express = require("express");
const router = express.Router();

const {
  createBus,
  getBuses,
  deleteBus,
  updateBus,
} = require("../controllers/bus.controller");

// Routes
router.post("/", createBus);
router.get("/", getBuses);
router.delete("/:id", deleteBus);
router.put("/:id", updateBus);

module.exports = router;