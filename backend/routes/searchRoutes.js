const express = require("express");

const {
  universalSearch,
} = require("../controllers/searchController");

const router = express.Router();

// Universal Search
router.get("/", universalSearch);

module.exports = router;