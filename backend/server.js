const express = require("express");
const cors = require("cors");
const db = require("./config/db");

const applicationRoutes = require("./routes/applicationRoutes");
const trackingRoutes = require("./routes/trackingRoutes");
const authRoutes = require("./routes/authRoutes");
const searchRoutes = require("./routes/searchRoutes");
const adminRoutes = require("./routes/adminRoutes");

const app = express();

app.use(cors());
app.use(express.json());

// Root API
app.get("/", (req, res) => {
  res.json({
    success: true,
    message: "Barangay e-Services API is running",
  });
});

// Tracking API Health Check
app.get("/api/tracking", (req, res) => {
  res.json({
    success: true,
    message: "Tracking API is working",
  });
});

// Authentication API
app.use("/api/auth", authRoutes);

// Application API
app.use("/api/applications", applicationRoutes);

// Tracking API
app.use("/api/tracking", trackingRoutes);

// Universal Search API
app.use("/api/search", searchRoutes);

// Admin API
app.use("/api/admin", adminRoutes);

const PORT = process.env.PORT || 5000;

const startServer = async () => {
  try {
    await db.query("SELECT 1");

    console.log("✅ Connected to MySQL Database");

    app.listen(PORT, () => {
      console.log(`🚀 Server running on port ${PORT}`);
    });
  } catch (error) {
    console.error("❌ Database connection failed:", error.message);
    process.exit(1);
  }
};

startServer();