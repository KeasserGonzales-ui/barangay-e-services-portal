const generateTrackingNumber = require("../utils/generateTrackingNumber");

const submitApplication = (req, res) => {
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
    remarks,
  } = req.body;

  if (!firstName || !lastName || !contactNumber || !purpose) {
    return res.status(400).json({
      success: false,
      message: "Please fill in all required fields.",
    });
  }

  const trackingNumber = generateTrackingNumber();

  return res.status(200).json({
    success: true,
    message: "Application submitted successfully.",
    trackingNumber,
    status: "pending",
    data: {
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
      remarks,
    },
  });
};

module.exports = {
  submitApplication,
};