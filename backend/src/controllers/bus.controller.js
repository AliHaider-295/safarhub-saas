const { prisma } = require("../db/prisma");

// ✅ Create Bus
const createBus = async (req, res) => {
  try {
    const { busNumber, type, capacity, status, driverName } = req.body;

    // ✅ get user from token (NOT frontend)
    const userId = req.user.sub;

    if (!busNumber || !type || !capacity || !status || !driverName) {
      return res.status(400).json({ error: "All fields are required" });
    }

    const parsedCapacity = Number(capacity);
    if (isNaN(parsedCapacity)) {
      return res.status(400).json({ error: "Capacity must be a number" });
    }

    const bus = await prisma.bus.create({
      data: {
        busNumber,
        type,
        capacity: parsedCapacity,
        status: status.toUpperCase(),
        driverName,
        user: {
          connect: { id: userId }, // ✅ safe now
        },
      },
    });

    res.status(201).json(bus);
  } catch (error) {
    console.error("Create Bus Error:", error);
    res.status(500).json({ error: "Failed to create bus" });
  }
};

// ✅ Get All Buses
const getBuses = async (req, res) => {
  try {
    const userId = req.user.sub;

    const buses = await prisma.bus.findMany({
      where: { userId }, // ✅ filter by user
      orderBy: { createdAt: "desc" },
    });

    res.json(buses);
  } catch (error) {
    console.error("Get Buses Error:", error);
    res.status(500).json({ error: "Failed to fetch buses" });
  }
};

// ✅ Delete Bus
const deleteBus = async (req, res) => {
  try {
    const { id } = req.params;
    const userId = req.user.sub;

    await prisma.bus.delete({
      where: {
        id,
        userId, // ✅ prevents deleting others data
      },
    });

    res.json({ message: "Bus deleted successfully" });
  } catch (error) {
    console.error("Delete Bus Error:", error);
    res.status(500).json({ error: "Failed to delete bus" });
  }
};
// ✅ Update Bus
const updateBus = async (req, res) => {
  try {
    const { id } = req.params;
    const userId = req.user.sub;

    const { busNumber, type, capacity, status, driverName } = req.body;

    const updated = await prisma.bus.update({
      where: {
        id,
        userId, // ✅ protect ownership
      },
      data: {
        busNumber,
        type,
        capacity: Number(capacity),
        status,
        driverName,
      },
    });

    res.json(updated);
  } catch (error) {
    console.error("Update Bus Error:", error);
    res.status(500).json({ error: "Failed to update bus" });
  }
};

module.exports = {
  createBus,
  getBuses,
  deleteBus,
  updateBus,
};