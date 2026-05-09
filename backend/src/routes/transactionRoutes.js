const express = require("express");

const router = express.Router();

const {
  createTransaction,
  getTransactions,
  getTransactionSummary
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
router.get(
  "/summary",
  protect,
  getTransactionSummary
);

module.exports = router;