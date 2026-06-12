const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const db = require("../config/db");

// Register Resident
const registerResident = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({
        success: false,
        message: "Email and password are required.",
      });
    }

    const [existingUser] = await db.query(
      "SELECT id FROM users WHERE email = ? LIMIT 1",
      [email]
    );

    if (existingUser.length > 0) {
      return res.status(409).json({
        success: false,
        message: "Email already exists.",
      });
    }

    const passwordHash = await bcrypt.hash(password, 10);

    await db.query(
      `
      INSERT INTO users (email, password_hash)
      VALUES (?, ?)
      `,
      [email, passwordHash]
    );

    return res.status(201).json({
      success: true,
      message: "Registration successful.",
    });
  } catch (error) {
    console.error(error);

    return res.status(500).json({
      success: false,
      message: "Server error.",
    });
  }
};

// Login Resident
const loginResident = async (req, res) => {
  try {
    const { email, password } = req.body;

    const [rows] = await db.query(
      `
      SELECT
        id,
        email,
        password_hash,
        role,
        is_active
      FROM users
      WHERE email = ?
      LIMIT 1
      `,
      [email]
    );

    console.log("=================================");
    console.log("LOGIN ATTEMPT");
    console.log("Email:", email);

    if (rows.length === 0) {
      console.log("User not found");
      console.log("=================================");

      return res.status(401).json({
        success: false,
        message: "Invalid email or password.",
      });
    }

    const user = rows[0];

    console.log("Database Email:", user.email);
    console.log("Password From Frontend:", password);
    console.log("Hash From Database:", user.password_hash);
    console.log("Account Active:", user.is_active);

    if (!user.is_active) {
      console.log("Inactive account");
      console.log("=================================");

      return res.status(403).json({
        success: false,
        message: "Account is inactive.",
      });
    }

    const validPassword = await bcrypt.compare(
      password,
      user.password_hash
    );

    console.log("Password Match:", validPassword);
    console.log("=================================");

    if (!validPassword) {
      return res.status(401).json({
        success: false,
        message: "Invalid email or password.",
      });
    }

    const token = jwt.sign(
      {
        id: user.id,
        email: user.email,
        role: user.role,
      },
      process.env.JWT_SECRET || "barangay-secret",
      {
        expiresIn: "1d",
      }
    );

    await db.query(
      `
      UPDATE users
      SET last_login = CURRENT_TIMESTAMP
      WHERE id = ?
      `,
      [user.id]
    );

    return res.json({
      success: true,
      message: "Login successful.",
      token,
      user: {
        id: user.id,
        email: user.email,
        role: user.role,
      },
    });
  } catch (error) {
    console.error(error);

    return res.status(500).json({
      success: false,
      message: "Server error.",
    });
  }
};

module.exports = {
  registerResident,
  loginResident,
};