
const db = require("../config/db");

// GET ALL RESIDENTS
const getResidents = async (req, res) => {
  try {
    const [rows] = await db.query(`
      SELECT
        id,
        resident_code,
        first_name,
        middle_name,
        last_name,
        suffix,
        birthdate,
        gender,
        civil_status,
        house_no,
        street,
        purok,
        barangay,
        city,
        contact_number,
        is_active,
        created_at,
        updated_at
      FROM residents
      ORDER BY last_name ASC, first_name ASC
    `);

    return res.status(200).json({
      success: true,
      message: "Residents retrieved successfully.",
      total: rows.length,
      data: rows,
    });
  } catch (error) {
    console.error("Get Residents Error:", error);

    return res.status(500).json({
      success: false,
      message: "Failed to retrieve residents.",
    });
  }
};

// GET RESIDENT BY ID
const getResidentById = async (req, res) => {
  try {
    const { id } = req.params;

    const [rows] = await db.query(
      `
      SELECT *
      FROM residents
      WHERE id = ?
    `,
      [id]
    );

    if (rows.length === 0) {
      return res.status(404).json({
        success: false,
        message: "Resident not found.",
      });
    }

    return res.status(200).json({
      success: true,
      data: rows[0],
    });
  } catch (error) {
    console.error("Get Resident Error:", error);

    return res.status(500).json({
      success: false,
      message: "Failed to retrieve resident.",
    });
  }
};

module.exports = {
  getResidents,
  getResidentById,
};