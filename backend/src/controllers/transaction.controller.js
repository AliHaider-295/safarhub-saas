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

module.exports = {
  createTransaction,
};