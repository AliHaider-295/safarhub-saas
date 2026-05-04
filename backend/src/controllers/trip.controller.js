const { prisma } = require("../db/prisma");
console.log("CREATE TRIP HIT");
// ✅ Create Trip
const createTrip = async (req, res) => {
  try {
    const {
      busId,
      routeId,
      income,
      expense,
      date,
      travelTime,
      notes,
      driverId,
    } = req.body;

    if (!req.user || !req.user.sub) {
      return res.status(401).json({ error: "Unauthorized" });
    }

    const userId = req.user.sub;

    if (!busId || !routeId || !date || income === undefined || expense === undefined) {
      return res.status(400).json({ error: "All required fields missing" });
    }

    const parsedDate = new Date(date);
    if (isNaN(parsedDate.getTime())) {
      return res.status(400).json({ error: "Invalid date format" });
    }

    const parsedIncome = Number(income);
    const parsedExpense = Number(expense);

    if (isNaN(parsedIncome) || isNaN(parsedExpense)) {
      return res.status(400).json({ error: "Income/Expense must be numbers" });
    }

    if (parsedIncome < 0 || parsedExpense < 0) {
      return res.status(400).json({ error: "Values must be positive" });
    }

    const parsedTravelTime = travelTime !== undefined ? Number(travelTime) : null;
    if (travelTime && isNaN(parsedTravelTime)) {
      return res.status(400).json({ error: "Invalid travel time" });
    }

    // 🔐 Ownership validation
    const busExists = await prisma.bus.findFirst({
      where: { id: busId, userId },
    });

    const routeExists = await prisma.route.findFirst({
      where: { id: routeId, userId  },
    });
if (!busExists) {
  return res.status(400).json({ error: "Invalid bus" });
}

if (!routeExists) {
  return res.status(400).json({ error: "Invalid route" });
}

    const trip = await prisma.trip.create({
      data: {
        income: parsedIncome,
        expense: parsedExpense,
        date: parsedDate,
        travelTime: parsedTravelTime,
        notes: notes || null,

        bus: { connect: { id: busId } },
        route: { connect: { id: routeId } },
        user: { connect: { id: userId } },

        ...(driverId && {
          driver: { connect: { id: driverId } },
        }),
      },
    });

    console.log("[CREATE TRIP]", { userId, busId, routeId });

    res.status(201).json(trip);
  } catch (error) {
    console.error("CREATE TRIP ERROR:", error);
    res.status(500).json({ error: "Create failed" });
  }
};

// ✅ Get Trips
const getTrips = async (req, res) => {
  try {
    const userId = req.user.sub;

    const trips = await prisma.trip.findMany({
      where: { userId },
      orderBy: { date: "desc" },
      include: {
        bus: true,
        route: true,
      },
    });

    res.json(trips);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Fetch failed" });
  }
};
const getTripsSummary = async (req, res) => {
  try {
    const userId = req.user.sub;

    const result = await prisma.trip.aggregate({
      where: {
        userId: userId, // 🔥 filters per user
      },
      _sum: {
        income: true,
        expense: true,
      },
      _count: true, // optional (useful for dashboard)
    });

    const totalIncome = result._sum.income || 0;
    const totalExpense = result._sum.expense || 0;

    res.json({
      totalIncome,
      totalExpense,
      totalProfit: totalIncome - totalExpense,
      totalTrips: result._count, // optional bonus
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to fetch summary" });
  }
};

// ✅ IMPORTANT EXPORT
module.exports = { createTrip, getTrips,getTripsSummary };