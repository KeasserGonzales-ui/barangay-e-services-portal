const express = require("express");

const {
  registerResident,
  loginResident,
} = require("../controllers/authController");

const router = express.Router();

// Register
router.post("/register", registerResident);

// Login
router.post("/login", loginResident);

module.exports = router;