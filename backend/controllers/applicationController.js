const db = require("../config/db");
const generateTrackingNumber = require("../utils/generateTrackingNumber");

const submitApplication = async (req, res) => {
  try {
    const {
      firstName,
      middleName,
      lastName,
      suffix,
      houseNo,
      street,
      purok,
      barangay,
      city,
      contactNumber,
      purpose,
      serviceType,
      remarks,
    } = req.body;

    // Required Fields Validation
    if (
      !firstName ||
      !lastName ||
      !contactNumber ||
      !purpose ||
      !serviceType
    ) {
      return res.status(400).json({
        success: false,
        message: "Please fill in all required fields.",
      });
    }

    // Generate Reference Number
    const referenceNumber = generateTrackingNumber();

    // Build Full Name
    const applicantName = [
      firstName,
      middleName,
      lastName,
      suffix,
    ]
      .filter(Boolean)
      .join(" ");

    // Build Full Address
    const address = [
      houseNo,
      street,
      purok,
      barangay,
      city,
    ]
      .filter(Boolean)
      .join(", ");

    // Save to Database
    await db.query(
      `
      INSERT INTO barangay_applications
      (
        reference_number,
        applicant_name,
        address,
        contact_number,
        purpose,
        service_type,
        remarks,
        status
      )
      VALUES
      (?, ?, ?, ?, ?, ?, ?, ?)
      `,
      [
        referenceNumber,
        applicantName,
        address,
        contactNumber,
        purpose,
        serviceType,
        remarks || null,
        "Pending",
      ]
    );

    return res.status(201).json({
      success: true,
      message: "Application submitted successfully.",
      referenceNumber,
      status: "Pending",
      data: {
        applicantName,
        address,
        contactNumber,
        purpose,
        serviceType,
        remarks,
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

const trackApplication = async (req, res) => {
  try {
    const { referenceNumber } = req.params;

    const [rows] = await db.query(
      `
      SELECT
        reference_number,
        applicant_name,
        service_type,
        status,
        created_at
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

module.exports = {
  submitApplication,
  trackApplication,
};