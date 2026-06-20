const express = require("express");

const {
  getResidents,
  getResidentById,
  createResident,
} = require("../controllers/residentController");

const router = express.Router();

// API Health Check
router.get("/", (req, res) => {
  res.json({
    success: true,
    message: "Resident API is working.",
  });
});

// Create Resident
router.post("/", createResident);

// Get All Residents
router.get("/list", getResidents);

// Get Resident by ID
router.get("/:id", getResidentById);

module.exports = router;