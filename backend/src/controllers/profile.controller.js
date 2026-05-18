const bcrypt = require("bcryptjs");
const { prisma } = require("../db/prisma");

/*
------------------------------------------------
GET PROFILE
------------------------------------------------
*/
const getProfile = async (req, res) => {
  try {
    const userId = req.user.id;

    const user = await prisma.user.findUnique({
      where: { id: userId },
      select: {
        id: true,
        fullName: true,
        email: true,
        role: true,
        phone : true,
        address: true,   // ✅ MUST EXIST
        createdAt: true
      }
    });

    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }

    // ✅ safe destructuring
    const { password, ...safeUser } = user;

    res.json({
      success: true,
      data: safeUser,
    });
  } catch (error) {
    console.error("Get Profile Error:", error);

    res.status(500).json({
      success: false,
      message: "Failed to fetch profile",
    });
  }
};

/*
------------------------------------------------
UPDATE PROFILE
------------------------------------------------
*/
const updateProfile = async (req, res) => {
  console.log("REQ BODY:", req.body);
  try {
    const userId = req.user.id;

    const {
      fullName,
      phone,
      gender,
      address,
      dateOfBirth,
    } = req.body;

    const updatedUser = await prisma.user.update({
      where: { id: userId },
      data: {
        fullName,
        phone,
        address,
        gender,
        dateOfBirth: dateOfBirth ? new Date(dateOfBirth) : undefined,
      },
    });
    
    console.log("UPDATED USER:", updatedUser);

    delete updatedUser.password;

    res.json({
      success: true,
      message: "Profile updated successfully",
      data: updatedUser,
    });
  } catch (error) {
    console.error("Update Profile Error:", error);

    res.status(500).json({
      success: false,
      message: "Profile update failed",
    });
  }
};

/*
------------------------------------------------
CHANGE PASSWORD
------------------------------------------------
*/
const changePassword = async (req, res) => {
  try {
    const userId = req.user.id;

    const { currentPassword, newPassword } = req.body;

    if (!currentPassword || !newPassword) {
      return res.status(400).json({
        success: false,
        message: "All fields required",
      });
    }

    const user = await prisma.user.findUnique({
      where: { id: userId },
    });

    const isMatch = await bcrypt.compare(
      currentPassword,
      user.password
    );

    if (!isMatch)
      return res.status(400).json({
        success: false,
        message: "Current password incorrect",
      });

    const hashedPassword = await bcrypt.hash(newPassword, 12);

    await prisma.user.update({
      where: { id: userId },
      data: { password: hashedPassword },
    });

    res.json({
      success: true,
      message: "Password changed successfully",
    });
  } catch (error) {
    console.error("Change Password Error:", error);

    res.status(500).json({
      success: false,
      message: "Password change failed",
    });
  }
};

//  Recent activity 

const getRecentActivity = async (req, res) => {
  try {
    const activity = await prisma.activityLog.findMany({
      where: { userId: req.user.id },
      take: 10,
      orderBy: { createdAt: "desc" },
    });

    res.json({
      success: true,
      data: activity,
    });
  } catch (error) {
    console.error(error);

    res.status(500).json({
      success: false,
      message: "Failed to load activity",
    });
  }
};

// logged In deveice 

const getLoggedDevices = async (req, res) => {
  try {
    const devices = await prisma.session.findMany({
      where: { userId: req.user.id },
      orderBy: { createdAt: "desc" },
    });

    res.json({
      success: true,
      data: devices,
    });
  } catch (error) {
    console.error(error);

    res.status(500).json({
      success: false,
      message: "Failed to fetch devices",
    });
  }
};


//  Toggle 2FA
const toggle2FA = async (req, res) => {
  try {
    const { enable } = req.body;

    const user = await prisma.user.update({
      where: { id: req.user.id },
      data: {
        twoFAEnabled: Boolean(enable),
      },
    });

    res.json({
      success: true,
      twoFAEnabled: user.twoFAEnabled,
    });
  } catch (error) {
    console.error(error);

    res.status(500).json({
      success: false,
      message: "2FA update failed",
    });
  }
};
/*
------------------------------------------------
DELETE ACCOUNT
------------------------------------------------
*/
const deleteProfile = async (req, res) => {
  try {
    const userId = req.user.id;

    await prisma.user.delete({
      where: { id: userId },
    });

    res.json({
      message: "Account deleted successfully",
    });
  } catch (error) {
    console.error("Delete Profile Error:", error);
    res.status(500).json({
      error: "Failed to delete account",
    });
  }
};

module.exports = {
  getProfile,
  updateProfile,
  changePassword,
  getRecentActivity,
  getLoggedDevices,
  toggle2FA,
  deleteProfile,
};