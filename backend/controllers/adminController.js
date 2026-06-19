const db = require("../config/db");

const getAllApplications = async (req, res) => {
  try {
    const { status, search, service } = req.query;

    let query = `
      SELECT
        id,
        reference_number,
        applicant_name,
        service_type,
        status,
        created_at
      FROM barangay_applications
      WHERE 1 = 1
    `;

    const params = [];

    if (status) {
      query += ` AND status = ?`;
      params.push(status);
    }

    if (service) {
      query += ` AND service_type = ?`;
      params.push(service);
    }

    if (search) {
      query += `
        AND (
          applicant_name LIKE ?
          OR reference_number LIKE ?
        )
      `;

      const keyword = `%${search}%`;

      params.push(keyword, keyword);
    }

    query += ` ORDER BY created_at DESC`;

    const [rows] = await db.query(query, params);

    return res.json({
      success: true,
      filters: {
        status: status || null,
        service: service || null,
        search: search || null,
      },
      total: rows.length,
      data: rows,
    });
  } catch (error) {
    console.error(error);

    return res.status(500).json({
      success: false,
      message: "Server error.",
    });
  }
};

const getApplicationByReference = async (req, res) => {
  try {
    const { referenceNumber } = req.params;

    const [rows] = await db.query(
      `
      SELECT
        id,
        reference_number,
        applicant_name,
        address,
        contact_number,
        purpose,
        service_type,
        remarks,
        status,
        created_at,
        updated_at
      FROM barangay_applications
      WHERE reference_number = ?
      LIMIT 1
      `,
      [referenceNumber]
    );

    if (rows.length === 0) {
      return res.status(404).json({
        success: false,
        message: "Application not found.",
      });
    }

    return res.json({
      success: true,
      data: rows[0],
    });
  } catch (error) {
    console.error(error);

    return res.status(500).json({
      success: false,
      message: "Server error.",
    });
  }
};

const updateApplicationStatus = async (req, res) => {
  try {
    const { referenceNumber } = req.params;
    const { status } = req.body;

    const allowedStatus = [
      "Pending",
      "Under Review",
      "Approved",
      "Rejected",
    ];

    if (!allowedStatus.includes(status)) {
      return res.status(400).json({
        success: false,
        message: "Invalid application status.",
      });
    }

    const [result] = await db.query(
      `
      UPDATE barangay_applications
      SET status = ?
      WHERE reference_number = ?
      `,
      [status, referenceNumber]
    );

    if (result.affectedRows === 0) {
      return res.status(404).json({
        success: false,
        message: "Application not found.",
      });
    }

    return res.json({
      success: true,
      message: "Application status updated successfully.",
      data: {
        reference_number: referenceNumber,
        status,
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

const getDashboardStats = async (req, res) => {
  try {
    const [rows] = await db.query(`
      SELECT
        COUNT(*) AS totalApplications,
        SUM(CASE WHEN status = 'Pending' THEN 1 ELSE 0 END) AS pending,
        SUM(CASE WHEN status = 'Under Review' THEN 1 ELSE 0 END) AS underReview,
        SUM(CASE WHEN status = 'Approved' THEN 1 ELSE 0 END) AS approved,
        SUM(CASE WHEN status = 'Rejected' THEN 1 ELSE 0 END) AS rejected
      FROM barangay_applications
    `);

    return res.json({
      success: true,
      data: rows[0],
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
  getAllApplications,
  getApplicationByReference,
  updateApplicationStatus,
  getDashboardStats,
};