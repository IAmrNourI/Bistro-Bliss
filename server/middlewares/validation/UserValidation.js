const { check, body } = require("express-validator");
const User = require("../../models/User");

//we can use body instead of check if we ensured thet the data coming from body
exports.userValidationRules = [
  check("name").trim().notEmpty().withMessage("Nameeee is required"),
  check("email").isEmail().withMessage("Invalid email format").custom(async (val) => {
    const user = await User.findOne({ email: val });
    if (user) {
      throw new Error("Email already exists");
    }
}),
  check("password")
    .trim()
    .notEmpty()
    .isLength({ min: 8 })
    .withMessage("Password at least 8 character"),
  check("phoneNumber")
    .trim()
    .notEmpty()
    .withMessage("Phone number is required"),
  check("profilePic")
    .trim()
    .notEmpty()
    .withMessage("profile Pic is required "), //isURL()
  check("role").optional().custom(async (val) => {
    if (val !== "user" && val !== "admin") {
      throw new Error("Invalid role. Must be 'user' or 'admin'");
    }
  }),
];

exports.updateUserValidationRules = [
  body("name").trim().optional().notEmpty().withMessage("name is required"), //optional check if provided or not
  body("email").optional().isEmail().withMessage("Invalid email format"),
  check("password")
    .optional()
    .trim()
    .notEmpty()
    .isLength({ min: 8 })
    .withMessage("Password at least 8 character"),
  check("phoneNumber")
    .optional()
    .trim()
    .notEmpty()
    .withMessage("Phone number is required"),
  check("profilePic")
    .optional()
    .trim()
    .notEmpty()
    .withMessage("Profile Pic is required "), //isURL()
  check("role")
    .optional()
    .custom(async (val) => {
      if (val !== "user" && val !== "admin") {
        throw new Error("Invalid role. Must be 'user' or 'admin'");
      }
    }),
];
