const express = require("express");
const router = express.Router();
const { getDashboardStats , getRecentTrips, getChartData} = require("../controllers/dashboard.controller");

router.get("/stats", getDashboardStats);

const { prisma } = require("../db/prisma");

router.get("/stats", async (req, res) => {
  try {
    // ✅ Aggregate directly in DB (FAST)
    const result = await prisma.trip.aggregate({
      _sum: {
        income: true,
        expense: true,
      },
      _count: true,
    });

    const revenue = result._sum.income || 0;
    const expense = result._sum.expense || 0;
    const profit = revenue - expense;

    const buses = await prisma.bus.count();

    // 👉 Temporary logic (replace later with real passengers table)
    const passengers = result._count * 30;

    res.json({
      revenue,
      profit,
      passengers,
      buses,
    });
  } catch (error) {
    console.error("Dashboard error:", error);
    res.status(500).json({ error: "Server error" });
  }
});
router.get("/stats", getDashboardStats);
router.get("/recent-trips", getRecentTrips);
router.get("/chart", getChartData);
module.exports = router;