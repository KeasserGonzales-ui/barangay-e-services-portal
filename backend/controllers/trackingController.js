const getTrackingStatus = (req, res) => {
  const { trackingNumber } = req.params;

  return res.json({
    success: true,
    trackingNumber,
    applicant: "Juan Dela Cruz",
    purpose: "Employment",
    status: "Pending Review",
    timeline: [
      "Application Submitted",
      "Under Review",
      "Verification",
      "Approved",
      "Ready for Printing",
      "Ready for Release",
    ],
  });
};

module.exports = {
  getTrackingStatus,
};