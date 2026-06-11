const registerResident = async (req, res) => {
  try {
    res.status(200).json({
      success: true,
      message: "Register controller is ready",
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Registration failed",
      error: error.message,
    });
  }
};

const loginResident = async (req, res) => {
  try {
    res.status(200).json({
      success: true,
      message: "Login controller is ready",
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Login failed",
      error: error.message,
    });
  }
};

module.exports = {
  registerResident,
  loginResident,
};