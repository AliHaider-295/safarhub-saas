const { prisma } = require("../db/prisma");

// ✅ Create Trip
const createTrip = async (req, res) => {
  try {
    const { bus, route, income, expense, date, day, userId } = req.body;

    if (!userId) {
      return res.status(400).json({ error: "userId is required" });
    }

    const trip = await prisma.trip.create({
      data: {
        bus,
        route,
        income: Number(income),
        expense: Number(expense),
        date: new Date(date),
        day,
        user: {
          connect: { id: userId },
        },
      },
    });

    res.json(trip);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Create failed" });
  }
};

// ✅ Get Trips
const getTrips = async (req, res) => {
  try {
    const trips = await prisma.trip.findMany({
      orderBy: { date: "desc" },
    });

    res.json(trips);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Fetch failed" });
  }
};

// ✅ IMPORTANT EXPORT
module.exports = { createTrip, getTrips };