const yup = require("yup");
const { ObjectId } = require("mongoose").Types;

// Custom Yup method to validate ObjectId
yup.addMethod(yup.string, "objectId", function (message) {
  return this.test("objectId", message, function (value) {
    const { path, createError } = this;
    return (
      ObjectId.isValid(value) || createError({ path, message: message || "Invalid ObjectId" })
    );
  });
});

module.exports = yup;
