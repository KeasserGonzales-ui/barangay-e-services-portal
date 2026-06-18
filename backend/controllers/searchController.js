
const db = require("../config/db");

const universalSearch = async (req, res) => {
  try {
    const { type = "resident", keyword = "" } = req.query;

    if (!keyword.trim()) {
      return res.status(400).json({
        success: false,
        message: "Search keyword is required.",
      });
    }

    if (type !== "resident") {
      return res.json({
        success: true,
        type,
        results: [],
      });
    }

    const [rows] = await db.query(
      `
      SELECT
        id,
        resident_code,
        first_name,
        middle_name,
        last_name,
        contact_number,
        barangay,
        purok
      FROM residents
      WHERE
            first_name LIKE ?
         OR middle_name LIKE ?
         OR last_name LIKE ?
         OR resident_code LIKE ?
         OR contact_number LIKE ?
         OR barangay LIKE ?
         OR purok LIKE ?
      ORDER BY last_name ASC
      `,
      [
        `%${keyword}%`,
        `%${keyword}%`,
        `%${keyword}%`,
        `%${keyword}%`,
        `%${keyword}%`,
        `%${keyword}%`,
        `%${keyword}%`,
      ]
    );

    return res.json({
      success: true,
      total: rows.length,
      results: rows,
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
  universalSearch,
};