const express = require("express");
const router = express.Router();

const {
  getAllApplications,
  getApplicationByReference,
  updateApplicationStatus,
  getDashboardStats,
} = require("../controllers/adminController");

// Health Check
router.get("/", (req, res) => {
  res.json({
    success: true,
    message: "Admin API is working.",
  });
});

// Dashboard Statistics
router.get("/dashboard", getDashboardStats);

// View All Applications
router.get("/applications", getAllApplications);

// View Single Application
router.get(
  "/applications/:referenceNumber",
  getApplicationByReference
);

// Update Application Status
router.patch(
  "/applications/:referenceNumber/status",
  updateApplicationStatus
);

module.exports = router;