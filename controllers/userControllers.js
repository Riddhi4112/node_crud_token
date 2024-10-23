require("dotenv").config;
const { userModel } = require("../models/user");
const {
  sendErrorResponse,
  sendSuccessResponse,
} = require("../utils/commonREsponse");
const { userDataSchema } = require("../validators/usersSchema");
const asyncHandler = require("../utils/asyncHandler");

class userController {
  constructor() {
    this.addUserData = asyncHandler(this.addUserData.bind(this));
    this.getUserData = asyncHandler(this.getUserData.bind(this));
    this.deleteUserData = asyncHandler(this.deleteUserData.bind(this));
    this.updateUserData = asyncHandler(this.updateUserData.bind(this));
  }

  async addUserData(req, res, next) {
    try {
      const { username, email, contact, age, status } = req.body;
      const isValid = await userDataSchema.validate(req.body);
      if (!isValid) {
        const errors = userDataSchema.validateSync(req.body, {
          abortEarly: false,
        }).error.details;
        const errorMessages = errors.map((error) => error.message);
        return sendErrorResponse({
          status: 400,
          res,
          message: errorMessages.join(","),
        });
      }

      const existingEmail = await userModel.findOne({ email });
      console.log("existincdgEmail", existingEmail);
      if (existingEmail) {
        return sendErrorResponse({
          status: 403,
          res,
          message: "email is already exist.",
        });
      }

      const userData = new userModel({
        username,
        email,
        contact,
        age,
        status,
      });
      await userData.save();
      sendSuccessResponse({
        status: 200,
        res,
        data: userData,
        message: "Plans add Successfully.",
      });
    } catch (error) {
      console.log("error", error);
      sendErrorResponse({
        status: 500,
        res,
        error: error.message,
        message: "Internal Server Error",
      });
    }
  }

  async getUserData(req, res, next) {
    try {
      const result = await userModel.find();
      sendSuccessResponse({
        status: 200,
        res,
        data: result,
        message: "get plans Successfully.",
      });
    } catch (error) {
      sendErrorResponse({
        status: 500,
        res,
        error: error.message,
        message: "Internal Server Error",
      });
    }
  }

  async deleteUserData(req, res, next) {
    try {
      const id = req.params.id;
      if (!id) {
        return sendErrorResponse({
          status: 400,
          res,
          message: "id is required.",
        });
      }
      const user = await userModel.findByIdAndDelete(id);

      if (!user) {
        return sendErrorResponse({
          status: 404,
          res,
          message: "User not found",
        });
      }
      sendSuccessResponse({
        status: 200,
        res,
        data: user,
        message: "Plan deleted successfully.",
      });
    } catch (error) {
      console.error(error);
      sendErrorResponse({
        status: 500,
        res,
        error: error.message,
        message: "Internal Server Error",
      });
    }
  }

  async updateUserData(req, res, next) {
    try {
      const id = req.params.id;
      console.log("isxsxsxd", id);
      if (!id) {
        return sendErrorResponse({
          status: 400,
          res,
          message: "id is required.",
        });
      }
      const { username, email, contact, age, status } = req.body;

      const isValid = await userDataSchema.validate(req.body);

      if (!isValid) {
        const errors = userDataSchema.validateSync(req.body, {
          abortEarly: false,
        }).error.details;
        const errorMessages = errors.map((error) => error.message);
        return sendErrorResponse({
          status: 400,
          res,
          message: errorMessages.join(","),
        });
      } else {
        const users = await userModel.findByIdAndUpdate(id, {
          username,
          email,
          contact,
          age,
          status,
        });

        if (!users) {
          return sendErrorResponse({
            status: 404,
            res,
            message: "User not found",
          });
        }
        sendSuccessResponse({
          status: 200,
          res,
          data: users,
          message: "User updated successfully",
        });
      }
    } catch (error) {
      console.error(error);
      sendErrorResponse({
        status: 500,
        res,
        error: error.message,
        message: "Internal Server Error",
      });
    }
  }
}

module.exports = new userController();
