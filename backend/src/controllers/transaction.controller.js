const { prisma } = require("../db/prisma");

/**
 * CREATE TRANSACTION
 */
const createTransaction = async (req, res) => {
  try {
    const {
      type,
      category,
      amount,
      paymentMethod,
      description,
      date,
      busId,
      routeId,
      staffId,
    } = req.body;

    const transaction = await prisma.transaction.create({
      data: {
        type,
        category,
        amount: Number(amount),
        paymentMethod,
        description,
        date: new Date(date),
        passengers: Number(req.body.passengers || 0),
        busId,
        routeId,
        staffId,

        createdById: req.user.id, // from auth middleware
      },
    });

    res.status(201).json({
      success: true,
      data: transaction,
    });
  } catch (error) {
    console.error("Create Transaction Error:", error);
    res.status(500).json({
      success: false,
      message: "Failed to create transaction",
    });
  }
};
const getTransactions = async (req, res) => {
  try {
    const transactions =
      await prisma.transaction.findMany({
        include: {
          bus: true,
          route: true,
          staff: true,
        },

        orderBy: {
          createdAt: "desc",
        },
      });

    res.json(transactions);

  } catch (error) {
    console.error(error);

    res.status(500).json({
      error: "Failed to fetch transactions",
    });
  }
};
const getTransactionSummary = async (req, res) => {
  try {
    const userId = req.user.sub;

    const transactions =
      await prisma.transaction.findMany({
        where: {
          createdById: userId,
        },
      });

    const totalIncome = transactions
      .filter((t) => t.type === "income")
      .reduce((sum, t) => sum + t.amount, 0);

    const totalExpense = transactions
      .filter((t) => t.type === "expense")
      .reduce((sum, t) => sum + t.amount, 0);

    const totalProfit =
      totalIncome - totalExpense;

    res.json({
      totalIncome,
      totalExpense,
      totalProfit,
    });

  } catch (error) {
    console.error(
      "Summary Error:",
      error
    );

    res.status(500).json({
      error: "Failed to fetch summary",
    });
  }
};
module.exports = {
  createTransaction,
  getTransactions,
  getTransactionSummary,
};