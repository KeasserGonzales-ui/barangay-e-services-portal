const express = require("express");
const router = express.Router();

const {
  getTrackingStatus,
} = require("../controllers/trackingController");

router.get("/:trackingNumber", getTrackingStatus);

module.exports = router;