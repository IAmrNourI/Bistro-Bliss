const { check } = require("express-validator");

exports.itemValidationRules = [
  check("name").custom(async (val) => {
    if (val.length === 0) {
      throw new Error("Item name is required");
    }
  }),
  check("price").custom(async (val) => {
    if (typeof val !== "number") {
      throw new Error("Item price is required in numbers");
    }
  }),
  check("description")
    .custom(async (val) => {
      if (typeof val !== "string" || val.trim().length === 0) {
        throw new Error("Item description is required");
      }
    }),
  check("category").custom(async (val) => {
    if (typeof val !== "string" || val.trim().length === 0) {
      throw new Error("Item category is required");
    }
  }),
  check("image")
    .custom(async (val) => {
      if (typeof val !== "string" || val.trim().length === 0) {
        throw new Error("Item Image source is required");
      }
    }),
];

exports.itemUpdateValidationRules = [
  check("name").optional().notEmpty().withMessage("Item name is required"),
  check("price")
    .optional()
    .isNumeric()
    .notEmpty()
    .withMessage("Item price is required in numbers"),
  check("category")
    .optional()
    .trim()
    .isString()
    .isLength({ min: 1 })
    .withMessage("Item description is required"),
  check("description")
    .optional()
    .isString()
    .withMessage("Item category is required"),
  check("image")
    .optional()
    .trim()
    .notEmpty()
    .isString()
    .withMessage("Item category is required"),
];
