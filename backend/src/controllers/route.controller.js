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

module.exports = {
  getDistanceStats,
};