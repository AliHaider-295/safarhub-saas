const express = require("express");
const router = express.Router();

const {
  getProfile,
  updateProfile,
  changePassword,
  getRecentActivity,
  getLoggedDevices,
  toggle2FA,
  deleteProfile,
} = require("../controllers/profile.controller");

const { protect } = require("../middleware/auth.middleware");
const { allowRoles } = require("../middleware/role.middleware");

/*
-----------------------------------------
PROFILE ROUTES
-----------------------------------------
*/

// GET PROFILE
router.get(
  "/",
  protect,
  allowRoles("ADMIN", "MANAGER", "STAFF", "USER"),
  getProfile
);

// UPDATE PROFILE
router.put(
  "/update",
  protect,
  allowRoles("ADMIN", "MANAGER", "STAFF", "USER"),
  updateProfile
);

// CHANGE PASSWORD
router.put(
  "/change-password",
  protect,
  changePassword
);

// RECENT ACTIVITY
router.get(
  "/activity",
  protect,
  getRecentActivity
);

// LOGGED DEVICES
router.get(
  "/devices",
  protect,
  getLoggedDevices
);

// TOGGLE 2FA
router.put(
  "/2fa",
  protect,
  toggle2FA
);

// DELETE PROFILE
router.delete(
  "/",
  protect,
  allowRoles("ADMIN", "USER"),
  deleteProfile
);

module.exports = router;