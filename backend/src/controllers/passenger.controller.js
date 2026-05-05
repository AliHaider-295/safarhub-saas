const { prisma } = require("../db/prisma");

// ✅ Create Passenger
const createPassenger = async (req, res) => {
  try {
    console.log("🔥 CREATE PASSENGER HIT");

    // 🔍 DEBUG: full user object
    console.log("USER OBJECT:", req.user);

    const userId = req.user?.sub;

    console.log("USER ID (from token):", userId);

    // ❌ Auth check
    if (!userId) {
      console.log("❌ NO USER ID FOUND - AUTH FAILED");
      return res.status(401).json({ error: "Unauthorized" });
    }

    const { name, tripId } = req.body;

    console.log("REQUEST BODY:", req.body);

    // ❌ Validate input
    if (!name || !tripId) {
      console.log("❌ Missing fields:", { name, tripId });
      return res.status(400).json({
        error: "Name and Trip ID are required",
      });
    }

    // 🔍 DEBUG: check trip lookup
    console.log("Checking trip...");
    console.log("Trip ID:", tripId);

    const trip = await prisma.trip.findFirst({
      where: {
        id: tripId,
        userId: userId,
      },
    });

    console.log("TRIP FOUND:", trip);

    if (!trip) {
      console.log("❌ Trip not found or not owned by user");
      return res.status(404).json({
        error: "Trip not found or not authorized",
      });
    }

    // 🔥 CREATE PASSENGER
    console.log("Creating passenger...");

    const passenger = await prisma.passenger.create({
      data: {
        name: name.trim(),
        tripId,
        userId,
      },
    });

    console.log("✅ PASSENGER CREATED:", passenger);

    return res.status(201).json(passenger);

  } catch (error) {
    console.error("❌ Create Passenger Error:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};

// ✅ Get passengers (DEBUG ADDED)
const getPassengers = async (req, res) => {
  try {
    console.log("🔥 GET PASSENGERS HIT");

    const userId = req.user?.sub;

    console.log("USER ID (getPassengers):", userId);

    const passengers = await prisma.passenger.findMany({
      where: { userId },
      orderBy: { createdAt: "desc" },
    });

    console.log("PASSENGERS FOUND:", passengers.length);
    console.log("PASSENGERS DATA:", passengers);

    return res.json(passengers);

  } catch (error) {
    console.error("❌ Get Passengers Error:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};

module.exports = {
  createPassenger,
  getPassengers,
};