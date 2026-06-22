const db = require("../config/db");

// CREATE RESIDENT
const createResident = async (req, res) => {
  try {
    const {
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
    } = req.body;

    if (!first_name || !last_name) {
      return res.status(400).json({
        success: false,
        message: "First name and last name are required.",
      });
    }

    const [result] = await db.query(
      `
      INSERT INTO residents (
        resident_code,
        user_id,
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
        is_active
      )
      VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
      `,
      [
        null,
        null,
        first_name,
        middle_name || null,
        last_name,
        suffix || null,
        birthdate || null,
        gender || null,
        civil_status || null,
        house_no || null,
        street || null,
        purok || null,
        barangay || null,
        city || null,
        contact_number || null,
        1,
      ]
    );

    const [rows] = await db.query(
      `
      SELECT *
      FROM residents
      WHERE id = ?
      `,
      [result.insertId]
    );

    return res.status(201).json({
      success: true,
      message: "Resident created successfully.",
      data: rows[0],
    });
  } catch (error) {
    console.error("Create Resident Error:", error);

    return res.status(500).json({
      success: false,
      message: "Failed to create resident.",
    });
  }
};

// GET ALL RESIDENTS
const getResidents = async (req, res) => {
  try {
    const {
      search = "",
      gender = "",
      purok = "",
      is_active = "",
    } = req.query;

    let query = `
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
        is_deleted,
        created_at,
        updated_at
      FROM residents
      WHERE is_deleted = 0
    `;

    const values = [];

    if (search) {
      query += `
        AND (
          resident_code LIKE ?
          OR first_name LIKE ?
          OR middle_name LIKE ?
          OR last_name LIKE ?
          OR contact_number LIKE ?
          OR barangay LIKE ?
          OR city LIKE ?
        )
      `;

      const keyword = `%${search}%`;

      values.push(
        keyword,
        keyword,
        keyword,
        keyword,
        keyword,
        keyword,
        keyword
      );
    }

    if (gender) {
      query += ` AND gender = ?`;
      values.push(gender);
    }

    if (purok) {
      query += ` AND purok LIKE ?`;
      values.push(`%${purok}%`);
    }

    if (is_active !== "") {
      query += ` AND is_active = ?`;
      values.push(is_active);
    }

    query += `
      ORDER BY
        last_name ASC,
        first_name ASC
    `;

    const [rows] = await db.query(query, values);

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
      AND is_deleted = 0
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
// UPDATE RESIDENT
const updateResident = async (req, res) => {
  try {
    const { id } = req.params;

    const {
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
    } = req.body;

    if (!first_name || !last_name) {
      return res.status(400).json({
        success: false,
        message: "First name and last name are required.",
      });
    }

    const [existing] = await db.query(
      `
      SELECT id
      FROM residents
      WHERE id = ?
      AND is_deleted = 0
      `,
      [id]
    );

    if (existing.length === 0) {
      return res.status(404).json({
        success: false,
        message: "Resident not found.",
      });
    }

    await db.query(
      `
      UPDATE residents
      SET
        first_name = ?,
        middle_name = ?,
        last_name = ?,
        suffix = ?,
        birthdate = ?,
        gender = ?,
        civil_status = ?,
        house_no = ?,
        street = ?,
        purok = ?,
        barangay = ?,
        city = ?,
        contact_number = ?
      WHERE id = ?
      `,
      [
        first_name,
        middle_name || null,
        last_name,
        suffix || null,
        birthdate || null,
        gender || null,
        civil_status || null,
        house_no || null,
        street || null,
        purok || null,
        barangay || null,
        city || null,
        contact_number || null,
        id,
      ]
    );

    const [rows] = await db.query(
      `
      SELECT *
      FROM residents
      WHERE id = ?
      `,
      [id]
    );

    return res.status(200).json({
      success: true,
      message: "Resident updated successfully.",
      data: rows[0],
    });
  } catch (error) {
    console.error("Update Resident Error:", error);

    return res.status(500).json({
      success: false,
      message: "Failed to update resident.",
    });
  }
};

// ACTIVATE RESIDENT
const activateResident = async (req, res) => {
  try {
    const { id } = req.params;

    const [existing] = await db.query(
      `
      SELECT id
      FROM residents
      WHERE id = ?
      AND is_deleted = 0
      `,
      [id]
    );

    if (existing.length === 0) {
      return res.status(404).json({
        success: false,
        message: "Resident not found.",
      });
    }

    await db.query(
      `
      UPDATE residents
      SET
        is_active = 1,
        updated_at = CURRENT_TIMESTAMP
      WHERE id = ?
      `,
      [id]
    );

    const [rows] = await db.query(
      `
      SELECT *
      FROM residents
      WHERE id = ?
      `,
      [id]
    );

    return res.status(200).json({
      success: true,
      message: "Resident activated successfully.",
      data: rows[0],
    });
  } catch (error) {
    console.error("Activate Resident Error:", error);

    return res.status(500).json({
      success: false,
      message: "Failed to activate resident.",
    });
  }
};

// DEACTIVATE RESIDENT
const deactivateResident = async (req, res) => {
  try {
    const { id } = req.params;

    const [existing] = await db.query(
      `
      SELECT id
      FROM residents
      WHERE id = ?
      AND is_deleted = 0
      `,
      [id]
    );

    if (existing.length === 0) {
      return res.status(404).json({
        success: false,
        message: "Resident not found.",
      });
    }

    await db.query(
      `
      UPDATE residents
      SET
        is_active = 0,
        updated_at = CURRENT_TIMESTAMP
      WHERE id = ?
      `,
      [id]
    );

    const [rows] = await db.query(
      `
      SELECT *
      FROM residents
      WHERE id = ?
      `,
      [id]
    );

    return res.status(200).json({
      success: true,
      message: "Resident deactivated successfully.",
      data: rows[0],
    });
  } catch (error) {
    console.error("Deactivate Resident Error:", error);

    return res.status(500).json({
      success: false,
      message: "Failed to deactivate resident.",
    });
  }
};
// SOFT DELETE RESIDENT
const deleteResident = async (req, res) => {
  try {
    const { id } = req.params;

    const [existing] = await db.query(
      `
      SELECT id
      FROM residents
      WHERE id = ?
      AND is_deleted = 0
      `,
      [id]
    );

    if (existing.length === 0) {
      return res.status(404).json({
        success: false,
        message: "Resident not found.",
      });
    }

    await db.query(
      `
      UPDATE residents
      SET
        is_deleted = 1,
        updated_at = CURRENT_TIMESTAMP
      WHERE id = ?
      `,
      [id]
    );

    return res.status(200).json({
      success: true,
      message: "Resident deleted successfully.",
    });
  } catch (error) {
    console.error("Delete Resident Error:", error);

    return res.status(500).json({
      success: false,
      message: "Failed to delete resident.",
    });
  }
};

module.exports = {
  createResident,
  getResidents,
  getResidentById,
  updateResident,
  activateResident,
  deactivateResident,
  deleteResident,
};