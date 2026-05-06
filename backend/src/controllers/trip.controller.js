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
      passengers,
    } = req.body;

    // 🔐 Auth check
    if (!req.user || !req.user.sub) {
      return res.status(401).json({ error: "Unauthorized" });
    }

    const userId = req.user.sub;

    // 🔐 Required fields check
    if (!busId || !routeId || !date || income === undefined || expense === undefined) {
      return res.status(400).json({ error: "All required fields missing" });
    }

    // 📅 Date validation
    const parsedDate = new Date(date);
    if (isNaN(parsedDate.getTime())) {
      return res.status(400).json({ error: "Invalid date format" });
    }

    // 🔢 Number parsing
    const parsedIncome = Number(income);
    const parsedExpense = Number(expense);
    const parsedPassengers = Number(passengers);

    if (isNaN(parsedIncome) || isNaN(parsedExpense)) {
      return res.status(400).json({ error: "Income/Expense must be numbers" });
    }

    if (isNaN(parsedPassengers)) {
      return res.status(400).json({ error: "Passengers must be a valid number" });
    }

    if (parsedIncome < 0 || parsedExpense < 0 || parsedPassengers < 0) {
      return res.status(400).json({ error: "Values cannot be negative" });
    }

    // ⏱ Travel time
    const parsedTravelTime =
      travelTime !== undefined && travelTime !== null
        ? Number(travelTime)
        : null;

    if (travelTime && isNaN(parsedTravelTime)) {
      return res.status(400).json({ error: "Invalid travel time" });
    }

    // 🔐 Ownership validation
    const busExists = await prisma.bus.findFirst({
      where: { id: busId, userId },
    });

    const routeExists = await prisma.route.findFirst({
      where: { id: routeId, userId },
    });

    if (!busExists) {
      return res.status(400).json({ error: "Invalid bus" });
    }

    if (!routeExists) {
      return res.status(400).json({ error: "Invalid route" });
    }

    // 🚀 Create trip
    const trip = await prisma.trip.create({
      data: {
        income: parsedIncome,
        expense: parsedExpense,
        date: parsedDate,
        travelTime: parsedTravelTime,
        notes: notes || null,
        passengers: parsedPassengers,

        bus: { connect: { id: busId } },
        route: { connect: { id: routeId } },
        user: { connect: { id: userId } },

        ...(driverId && {
          driver: { connect: { id: driverId } },
        }),
      },
    });

    console.log("[CREATE TRIP]", { userId, busId, routeId });

    return res.status(201).json(trip);
  } catch (error) {
    console.error("CREATE TRIP ERROR:", error);
    return res.status(500).json({ error: "Create failed" });
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
      where: { userId },

      _sum: {
        income: true,
        expense: true,
        passengers: true,
      },

      _count: true,
    });

    const totalIncome = result._sum.income || 0;
    const totalExpense = result._sum.expense || 0;
    const totalPassengers = result._sum.passengers || 0;
    const totalTrips = result._count || 0;

    res.json({
      totalIncome,
      totalExpense,
      totalProfit: totalIncome - totalExpense,
      totalTrips,
      totalPassengers,
    });
  } catch (err) {
    console.error("SUMMARY ERROR:", err);
    res.status(500).json({ error: "Failed to fetch summary" });
  }
};

// ✅ IMPORTANT EXPORT
module.exports = { createTrip, getTrips,getTripsSummary };