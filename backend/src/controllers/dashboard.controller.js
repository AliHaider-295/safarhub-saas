// ✅ Dashboard Stats
const { prisma } = require("../db/prisma");

// ✅ Dashboard Stats (CLEAN VERSION)
const getDashboardStats = async (req, res) => {
  try {
    const userId = req.user?.sub;

    if (!userId) {
      return res.status(401).json({ error: "Unauthorized" });
    }

    const [revenueData, expenseData, buses, tripsCount, passengers] =
      await Promise.all([
        prisma.trip.aggregate({
          where: { userId },
          _sum: { income: true },
        }),

        prisma.trip.aggregate({
          where: { userId },
          _sum: { expense: true },
        }),

        prisma.bus.count({
          where: { userId },
        }),

        prisma.trip.count({
          where: { userId },
        }),

        prisma.passenger.count({
          where: {
            userId: userId, // must match exactly
          },
        }),
      ]);
      console.log("USER ID:", userId);
      console.log("PASSENGERS:", passengers);
    const revenue = revenueData._sum.income || 0;
    const expense = expenseData._sum.expense || 0;
    const profit = revenue - expense;

    return res.json({
      revenue,
      profit,
      buses,
      passengers,
      trips: tripsCount,
    });

  } catch (error) {
    console.error("Dashboard Stats Error:", error);
    res.status(500).json({ error: "Something went wrong" });
  }
};
// ✅ Recent Trips
const getRecentTrips = async (req, res) => {
  try {
    const trips = await prisma.trip.findMany({
      orderBy: { date: "desc" },
      take: 5,
      include: {
        bus: true,
        route: true,
      },
    });

    // ✅ Transform data for frontend
    const formatted = trips.map((t) => ({
      id: t.id,
      bus: t.bus?.busNumber || "N/A",
      route: `${t.route?.from || ""} → ${t.route?.to || ""}`,
      income: t.income,
      date: t.date,
    }));

    res.json(formatted);
  } catch (error) {
    console.error("Recent Trips Error:", error);
    res.status(500).json({ error: "Failed to fetch trips" });
  }
};
// ✅ Chart Data
const getChartData = async (req, res) => {
  try {
    const trips = await prisma.trip.findMany();

    const days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

    const data = days.map((day, index) => {
      const dayTrips = trips.filter((t) => {
        const tripDay = new Date(t.date).getDay(); // 0 = Sun
        return tripDay === index;
      });

      return {
        day,
        income: dayTrips.reduce((sum, t) => sum + t.income, 0),
        expense: dayTrips.reduce((sum, t) => sum + t.expense, 0),
      };
    });

    res.json(data);
  } catch (error) {
    console.error("Chart Error:", error);
    res.status(500).json({ error: "Chart error" });
  }
};

module.exports = {
  getDashboardStats,
  getRecentTrips,
  getChartData,
};