const express = require("express");
const router = express.Router();
const { PrismaClient } = require("@prisma/client");

const prisma = new PrismaClient();

router.get("/", async (req, res) => {
  try {
    const trips = await prisma.trip.findMany();

    const totalRevenue = trips.reduce((sum, t) => sum + t.income, 0);
    const totalExpense = trips.reduce((sum, t) => sum + t.expense, 0);
    const profit = totalRevenue - totalExpense;

    const totalBuses = await prisma.bus.count();

    res.json({
      revenue: totalRevenue,
      expense: totalExpense,
      profit,
      buses: totalBuses,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Server error" });
  }
});

module.exports = router;