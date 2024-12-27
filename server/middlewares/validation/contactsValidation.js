const { check } = require("express-validator");

exports.contactsValidationRules = [
    check("name").trim().notEmpty().withMessage("Name is required"),
    check("email").isEmail().withMessage("Invalid email format"),
    check("subject").trim().notEmpty().withMessage("Subject is required"),
    check("message").trim().notEmpty().withMessage("Message is required"),
];