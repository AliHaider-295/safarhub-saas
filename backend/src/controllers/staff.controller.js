const { prisma } = require("../db/prisma");

// ✅ Create Staff
const createStaff = async (req, res) => {
  try {
    const userId = req.user.sub; // from JWT

    const { name, role, phone, status } = req.body;

    if (!name || !role || !phone) {
      return res.status(400).json({ error: "All fields required" });
    }

    const staff = await prisma.staff.create({
      data: {
        name,
        role,
        phone,
        status: status || "ACTIVE",
        userId,
      },
    });

    res.status(201).json(staff);
  } catch (error) {
    console.error("Create Staff Error:", error);
    res.status(500).json({ error: "Failed to create staff" });
  }
};

// ✅ Get All Staff
const getStaff = async (req, res) => {
  try {
    const userId = req.user.sub;

    const staff = await prisma.staff.findMany({
      where: { userId },
      orderBy: { createdAt: "desc" },
    });

    res.json(staff);
  } catch (error) {
    console.error("Get Staff Error:", error);
    res.status(500).json({ error: "Failed to fetch staff" });
  }
};

// ✅ Update Staff
const updateStaff = async (req, res) => {
  try {
    const { id } = req.params;

    const updated = await prisma.staff.update({
      where: { id },
      data: req.body,
    });

    res.json(updated);
  } catch (error) {
    console.error("Update Staff Error:", error);
    res.status(500).json({ error: "Failed to update staff" });
  }
};

// ✅ Delete Staff
const deleteStaff = async (req, res) => {
  try {
    const { id } = req.params;

    await prisma.staff.delete({
      where: { id },
    });

    res.json({ message: "Staff deleted" });
  } catch (error) {
    console.error("Delete Staff Error:", error);
    res.status(500).json({ error: "Failed to delete staff" });
  }
};

// ✅ Staff Stats (for cards + chart)
const getStaffStats = async (req, res) => {
  try {
    const userId = req.user.sub;

    const staff = await prisma.staff.findMany({
      where: { userId },
    });

    const total = staff.length;
    const active = staff.filter((s) => s.status === "ACTIVE").length;
    const inactive = staff.filter((s) => s.status === "INACTIVE").length;

    // role-based
    const roles = {};

    staff.forEach((s) => {
      roles[s.role] = (roles[s.role] || 0) + 1;
    });

    res.json({
      total,
      active,
      inactive,
      roles,
    });
  } catch (error) {
    console.error("Stats Error:", error);
    res.status(500).json({ error: "Failed to fetch stats" });
  }
};

module.exports = {
  createStaff,
  getStaff,
  updateStaff,
  deleteStaff,
  getStaffStats,
};