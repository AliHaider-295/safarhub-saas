const { prisma } = require("../db/prisma");

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

    // ✅ Always get from auth middleware (NOT req.body)
    const userId = req.user.id;

    if (!busId || !routeId) {
      return res.status(400).json({ error: "busId and routeId are required" });
    }

    const trip = await prisma.trip.create({
      data: {
        income: Number(income),
        expense: Number(expense),
        date: new Date(date),
        travelTime: travelTime ? Number(travelTime) : null,
        notes,

        // ✅ Relations
        bus: {
          connect: { id: busId },
        },
        route: {
          connect: { id: routeId },
        },
        user: {
          connect: { id: userId },
        },

        // ✅ Optional driver relation (if you add it)
        ...(driverId && {
          driver: {
            connect: { id: driverId },
          },
        }),
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