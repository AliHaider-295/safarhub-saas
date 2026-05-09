const { prisma } = require("../db/prisma");

// ✅ DASHBOARD STATS
const getDashboardStats = async (req, res) => {
  try {
    const userId = req.user?.sub;

    if (!userId) {
      return res
        .status(401)
        .json({ error: "Unauthorized" });
    }

    // ALL TRANSACTIONS
    const transactions =
    await prisma.transaction.findMany({
      where: {
        createdById: userId,
      },
    });

    const passengers = transactions.reduce(
      (sum, t) => sum + (t.passengers || 0),
      0
    );

    // TOTAL INCOME
    const revenue = transactions
      .filter((t) => t.type === "income")
      .reduce((sum, t) => sum + t.amount, 0);

    // TOTAL EXPENSE
    const expense = transactions
      .filter((t) => t.type === "expense")
      .reduce((sum, t) => sum + t.amount, 0);

    // PROFIT
    const profit = revenue - expense;

    // TOTAL BUSES
    const buses = await prisma.bus.count({
      where: {
        userId: userId,
      }
    });

    // TOTAL TRANSACTIONS
    const transactionsCount =
      transactions.length;

    return res.json({
      revenue,
      expense,
      profit,
      buses,
      transactions: transactionsCount,
      passengers,
    });

  } catch (error) {
    console.error(
      "Dashboard Stats Error:",
      error
    );

    res.status(500).json({
      error: "Something went wrong",
    });
  }
};

// ✅ RECENT TRANSACTIONS
const getRecentTrips = async (req, res) => {
  try {

    const transactions =
      await prisma.transaction.findMany({
        where: {
          createdById: req.user.sub,
        },

        orderBy: {
          date: "desc",
        },

        take: 5,

        include: {
          bus: true,
          route: true,
        },
      });

    // FORMAT FOR FRONTEND
    const formatted =
      transactions.map((t) => ({
        id: t.id,

        type: t.type,

        category: t.category,

        amount: t.amount,

        bus:
          t.bus?.busNumber || "N/A",

        route: t.route
          ? `${t.route?.from || ""} → ${
              t.route?.to || ""
            }`
          : "N/A",

        date: t.date,
      }));

    res.json(formatted);

  } catch (error) {
    console.error(
      "Recent Transactions Error:",
      error
    );

    res.status(500).json({
      error: "Failed to fetch transactions",
    });
  }
};

// ✅ CHART DATA
const getChartData = async (req, res) => {
  try {

    const transactions =
      await prisma.transaction.findMany({
        where: {
          createdById: req.user.sub,
        },
      });

    const days = [
      "Sun",
      "Mon",
      "Tue",
      "Wed",
      "Thu",
      "Fri",
      "Sat",
    ];

    const data = days.map(
      (day, index) => {

        const dayTransactions =
          transactions.filter((t) => {
            const transactionDay =
              new Date(t.date).getDay();

            return (
              transactionDay === index
            );
          });

        return {
          day,

          income:
            dayTransactions
              .filter(
                (t) =>
                  t.type === "income"
              )
              .reduce(
                (sum, t) =>
                  sum + t.amount,
                0
              ),

          expense:
            dayTransactions
              .filter(
                (t) =>
                  t.type === "expense"
              )
              .reduce(
                (sum, t) =>
                  sum + t.amount,
                0
              ),
        };
      }
    );

    res.json(data);

  } catch (error) {

    console.error(
      "Chart Error:",
      error
    );

    res.status(500).json({
      error: "Chart error",
    });
  }
};

module.exports = {
  getDashboardStats,
  getRecentTrips,
  getChartData,
};