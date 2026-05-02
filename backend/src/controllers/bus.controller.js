const { prisma } = require("../db/prisma");

/* =========================
   ➕ CREATE BUS
========================= */
const createBus = async (req, res) => {
  try {
    const { busNumber, type, capacity, status, driverName } = req.body;

    const userId = req.user.sub;

    // ✅ REQUIRED FIELDS (match frontend)
    if (!busNumber) {
      return res.status(400).json({ error: "Bus number is required" });
    }

    // ✅ SAFE NUMBER
    const parsedCapacity = capacity ? Number(capacity) : 0;

    if (capacity && isNaN(parsedCapacity)) {
      return res.status(400).json({ error: "Capacity must be a number" });
    }

    const bus = await prisma.bus.create({
      data: {
        busNumber,
        type: type || "AC",
        capacity: parsedCapacity,
        status: (status || "ACTIVE").toUpperCase(),
        driverName: driverName || "Not Assigned", // ✅ safe fallback
        // 🔐 USER LINK
        user: {
          connect: { id: userId },
        },
      },
    });

    res.status(201).json(bus);
  } catch (error) {
    console.error("Create Bus Error:", error);
    res.status(500).json({ error: "Failed to create bus" });
  }
};

/* =========================
   📦 GET BUSES (USER BASED)
========================= */
const getBuses = async (req, res) => {
  try {
    const userId = req.user.sub;

    const buses = await prisma.bus.findMany({
      where: { userId },
      orderBy: { createdAt: "desc" },
    });

    res.json(buses);
  } catch (error) {
    console.error("Get Buses Error:", error);
    res.status(500).json({ error: "Failed to fetch buses" });
  }
};

/* =========================
   ❌ DELETE BUS
========================= */
const deleteBus = async (req, res) => {
  try {
    const { id } = req.params;
    const userId = req.user.sub;

    await prisma.bus.deleteMany({
      where: {
        id,
        userId,
      },
    });

    res.json({ message: "Bus deleted successfully" });
  } catch (error) {
    console.error("Delete Bus Error:", error);
    res.status(500).json({ error: "Failed to delete bus" });
  }
};

/* =========================
   ✏️ UPDATE BUS
========================= */
const updateBus = async (req, res) => {
  try {
    const { id } = req.params;
    const userId = req.user.sub;

    const { busNumber, type, capacity, status } = req.body;

    const updated = await prisma.bus.updateMany({
      where: {
        id,
        userId,
      },
      data: {
        ...(busNumber && { busNumber }),
        ...(type && { type }),
        ...(capacity && { capacity: Number(capacity) }),
        ...(status && { status: status.toUpperCase() }),
      },
    });

    res.json({ message: "Bus updated successfully", updated });
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