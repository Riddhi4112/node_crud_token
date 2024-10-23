// Function to send a success response
const sendSuccessResponse = ({ res, data, message, status }) => {
    res
     .status(status || 200)
     .json({ message, data, success: true, status: status || 200 });
  };
  
  // Function to send an error response
  const sendErrorResponse = ({ status, res, error, message }) => {
    res.status(status || 500).json({
      message: error?.message || message || "Unknown Error",
      error: error,
      success: false,
      status: status || 500,
    });
  };
  
  // Export the function
  module.exports = {
    sendSuccessResponse,
    sendErrorResponse,
  };