const express = require("express");
const router = express.Router();

const {
  submitApplication,
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

module.exports = router;