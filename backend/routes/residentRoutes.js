const express = require("express");

const {
  getResidents,
  getResidentStatistics,
  getResidentById,
  createResident,
  updateResident,
  activateResident,
  deactivateResident,
  deleteResident,
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

// Resident Statistics
router.get("/statistics", getResidentStatistics);

// Get All Residents
router.get("/list", getResidents);

// Get Resident by ID
router.get("/:id", getResidentById);

// Update Resident
router.put("/:id", updateResident);

// Activate Resident
router.patch("/:id/activate", activateResident);

// Deactivate Resident
router.patch("/:id/deactivate", deactivateResident);

// Soft Delete Resident
router.delete("/:id", deleteResident);

module.exports = router;