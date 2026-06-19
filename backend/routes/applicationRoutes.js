const express = require("express");
const router = express.Router();

const {
  submitApplication,
  trackApplication,
} = require("../controllers/applicationController");

// Test Route
router.get("/", (req, res) => {
  res.json({
    success: true,
    message: "Application API is working.",
  });
});

// Submit Application
router.post("/", submitApplication);

// Track Application
router.get("/:referenceNumber", trackApplication);

module.exports = router;