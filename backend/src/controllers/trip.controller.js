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

    const parsedTravelTime = travelTime ? Number(travelTime) : null;
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

    if (!busExists || !routeExists) {
      return res.status(400).json({ error: "Invalid bus or route" });
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
    const userId = req.user.id;

    const trips = await prisma.trip.findMany({
      where: { userId },
      orderBy: { date: "desc" },

      include: {
        bus: true,
        route: true,
        // driver: true (if added)
      },
    });

    res.json(trips);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Fetch failed" });
  }
};

// ✅ IMPORTANT EXPORT
module.exports = { createTrip, getTrips };