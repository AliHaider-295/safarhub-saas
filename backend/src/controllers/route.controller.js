const { prisma } = require("../db/prisma");

// ✅ Distance Chart API
const getDistanceStats = async (req, res) => {
  try {
    const routes = await prisma.route.findMany();

    let short = 0;
    let medium = 0;
    let long = 0;

    routes.forEach((r) => {
      if (r.distance < 200) short++;
      else if (r.distance <= 500) medium++;
      else long++;
    });

    res.json([
      { name: "Short (<200km)", value: short },
      { name: "Medium (200-500km)", value: medium },
      { name: "Long (>500km)", value: long },
    ]);
  } catch (error) {
    console.error("Distance Stats Error:", error);
    res.status(500).json({ error: "Failed to fetch stats" });
  }
};

// ✅ Route Usage Chart API
const getRouteUsage = async (req, res) => {
  try {
    const routes = await prisma.route.findMany({
      include: {
        trips: true, // only if you have trips relation
      },
    });

    const formatted = routes.map((r) => ({
      route: `${r.from} → ${r.to}`,
      trips: r.trips ? r.trips.length : 0,
    }));

    res.json(formatted);
  } catch (error) {
    console.error("Route Usage Error:", error);
    res.status(500).json({ error: "Failed to fetch usage" });
  }
};
// ✅ GET all routes
const getRoutes = async (req, res) => {
  try {
    const routes = await prisma.route.findMany({
      orderBy: { createdAt: "desc" },
    });

    res.json(routes);
  } catch (error) {
    console.error("Get Routes Error:", error);
    res.status(500).json({ error: "Failed to fetch routes" });
  }
};

// ✅ CREATE route
const createRoute = async (req, res) => {
  try {
    const { from, to, distance } = req.body;

    if (!from || !to || !distance) {
      return res.status(400).json({ error: "All fields required" });
    }

    const route = await prisma.route.create({
      data: {
        from,
        to,
        distance: Number(distance),
        status: "ACTIVE",
        user: {
          connect: { id: req.user.sub } // ✅ THIS LINE FIXES YOUR ERROR
        }
      }
    });

    res.status(201).json(route);
  } catch (error) {
    console.error("Create Route Error:", error);
    res.status(500).json({ error: "Failed to create route" });
  }
};

// ✅ DELETE route
const deleteRoute = async (req, res) => {
  try {
    const { id } = req.params;

    await prisma.route.delete({
      where: { id },
    });

    res.json({ message: "Route deleted" });
  } catch (error) {
    console.error("Delete Route Error:", error);
    res.status(500).json({ error: "Failed to delete route" });
  }
};
module.exports = {
  getDistanceStats,
  getRouteUsage,
  getRoutes,
  createRoute,
  deleteRoute,
};