const { check, body } = require("express-validator");

//we can use body instead of check if we ensured thet the data coming from body
exports.userValidationRules = [
  check("name").trim().notEmpty().withMessage("Nameeee is required"),
  check("email").isEmail().withMessage("Invalid email format"),
  check("password").trim().notEmpty().isLength({ min: 8 }).withMessage("Password at least 8 character"),
];

exports.updateUserValidationRules = [
    body("name").trim().optional().notEmpty().withMessage("name is required"), //optional check if provided or not
    body("email").optional().isEmail().withMessage("Invalid email format"),
    check("password").optional().trim().notEmpty().isLength({ min: 8 }).withMessage("Password at least 8 character"),
  ]