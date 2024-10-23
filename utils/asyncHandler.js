const { sendErrorResponse } = require("./commonREsponse");

//common try catch handler
const asyncHandler = (fn) => {
  return async (req, res, next) => {
    try {
      await fn(req, res, next);
    } catch (error) {
      sendErrorResponse({
        status: 500,
        res,
        error: error.message,
        message: "Internal Server Error",
      });
    }
  };
};

module.exports = asyncHandler;
