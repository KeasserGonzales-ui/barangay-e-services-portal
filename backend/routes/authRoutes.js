const express = require("express");

const {
  registerResident,
  loginResident,
  getResidentProfile,
} = require("../controllers/authController");

const authenticateUser = require("../middleware/authMiddleware");

const router = express.Router();

// Register
router.post("/register", registerResident);

// Login
router.post("/login", loginResident);

// Resident Profile
router.get(
  "/profile",
  authenticateUser,
  getResidentProfile
);

module.exports = router;