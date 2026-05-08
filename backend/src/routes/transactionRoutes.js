const express = require("express");

const router = express.Router();

const {
  createTransaction,
} = require("../controllers/transaction.controller");

const { protect } = require("../middleware/auth.middleware");

router.post(
  "/",
  protect,
  createTransaction
);

module.exports = router;