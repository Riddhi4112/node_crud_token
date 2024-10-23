const yup = require("./customYupMethod");

    const userDataSchema = yup.object().shape({
        username: yup
        .string()
        .required("User name can not be blank.")
        .min(2, "User name must be at least 4 characters long.")
        .max(32, "User name can not be more than 32 characters long.")
        .trim(),
        email: yup
        .string()
        .required("Email can not be blank.")
        .email("Email format is incorrect.")
        .min(6, "Email must be 6 or more characters long.")
        .max(254, "Email can not be more than 254 characters long.")
        .trim(),
        contact: yup.number().nullable(),
        age: yup.number().min(23),
        status: yup.boolean().default(false)
      });

      module.exports={
        userDataSchema
      }