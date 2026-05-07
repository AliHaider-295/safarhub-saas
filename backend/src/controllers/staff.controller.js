const { prisma } = require("../db/prisma");

// ✅ Create Staff
const createStaff = async (req, res) => {
  try {
    const userId = req.user.sub; // from JWT

    const { name, role, phone, status } = req.body;

    if (!name || !role || !phone) {
      return res.status(400).json({
        error: "All fields required",
      });
    }
    
    // Remove spaces and dashes
    const cleanPhone = phone.replace(/[-\s]/g, "");
    
    // Pakistan phone validation
    const phoneRegex = /^(\+92|0)?3\d{9}$/;
    
    if (!phoneRegex.test(cleanPhone)) {
      return res.status(400).json({
        error: "Invalid Pakistan phone number",
      });
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

    const staff = await prisma.staff.findUnique({
      where: { id },
    });

    if (!staff) {
      return res.status(404).json({
        error: "Staff not found",
      });
    }

    await prisma.staff.delete({
      where: { id },
    });

    res.json({ message: "Staff deleted successfully" });

  } catch (error) {
    console.error("Delete Staff Error:", error);

    res.status(500).json({
      error: "Failed to delete staff",
    });
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
    const active = staff.filter(
      (s) => s.status?.toLowerCase() === "active"
    ).length;
    
    const inactive = staff.filter(
      (s) => s.status?.toLowerCase() === "inactive"
    ).length;

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