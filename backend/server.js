const express = require("express");
const cors = require("cors");
const db = require("./config/db");

const app = express();

app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
  res.json({
    success: true,
    message: "Barangay e-Services API is running",
  });
});
app.get("/api/tracking", (req, res) => {
  res.json({
    success: true,
    message: "Tracking API is working",
  });
});
db.connect((err) => {
  if (err) {
    console.error("Database connection failed:", err.message);
    return;
  }

  console.log("✅ Connected to MySQL Database");
});

const PORT = 5000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});