const express = require("express");

const router = express.Router();

const {
  createTransaction,
  getTransactions,
} = require("../controllers/transaction.controller");

const { protect } = require("../middleware/auth.middleware");

router.post(
  "/",
  protect,
  createTransaction
);
router.get(
  "/",
  protect,
  getTransactions
);

module.exports = router;