const { prisma } = require("../db/prisma");
const { Parser } = require("json2csv");

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

        createdById: req.user.sub, // from auth middleware
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

    console.log(req.query);

    const {
      fromDate,
      toDate,
      type,
      category,
      busId,
      routeId,
    } = req.query;

    const userId = req.user.sub;

    const where = {

      createdById: userId,

      ...(type && {
        type,
      }),

      ...(category && {
        category,
      }),

      ...(busId && {
        busId,
      }),

      ...(routeId && {
        routeId,
      }),

      ...(fromDate || toDate
        ? {
            date: {

              ...(fromDate && {
                gte: new Date(fromDate),
              }),

              ...(toDate && {
                lte: new Date(toDate),
              }),
            },
          }
        : {}),
    };

    const transactions =
      await prisma.transaction.findMany({
        where,

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

    console.error(
      "Get Transactions Error:",
      error
    );

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
const exportTransactions = async (req, res) => {

  try {

    const transactions =
      await prisma.transaction.findMany();

    const formatted =
      transactions.map((t) => ({
        Type: t.type,
        Category: t.category,
        Amount: t.amount,
      }));

    const parser = new Parser();

    const csv = parser.parse(formatted);

    res.header(
      "Content-Type",
      "text/csv"
    );

    res.attachment(
      "transactions.csv"
    );

    return res.send(csv);

  } catch (error) {

    console.error(error);

    res.status(500).json({
      error: "Export failed",
    });
  }
};

module.exports = {
  createTransaction,
  getTransactions,
  getTransactionSummary,
  exportTransactions,
};