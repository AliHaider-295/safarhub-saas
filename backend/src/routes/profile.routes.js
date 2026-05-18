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
// Only logged-in users
router.get(
  "/",
  protect,
  allowRoles("ADMIN", "MANAGER", "STAFF"),
);

router.put(
  "/update",
  protect,
  allowRoles("ADMIN", "MANAGER", "STAFF"),
);

router.put(
  "/change-password",
  protect,
);

router.get(
  "/activity",
  protect,
);

router.get(
  "/devices",
  protect,
);

router.put(
  "/2fa",
  protect,
);
router.delete(
  "/",
  protect,
  allowRoles("ADMIN", "USER")
);

module.exports = router;