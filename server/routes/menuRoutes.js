const express = require("express");
const router = express.Router();
const menuController = require("../controller/menuController");
const {
  itemValidationRules,
  itemUpdateValidationRules,
} = require("../middlewares/validation/itemsValidation");
const { valdationResults } = require("../middlewares/validation/validationResult");
const { isAuth } = require("../middlewares/auth/isAuth");
const isRole = require("../middlewares/auth/isRole");

router.get("/", menuController.getAllItems);

router.post(
  "/add-item",
  isAuth,
  isRole("admin"),
  itemValidationRules,
  valdationResults,
  menuController.add
);

router.put(
  "/edit-item",
  isAuth,
  isRole("admin"),
  itemUpdateValidationRules,
  valdationResults,
  menuController.edit
);

router.delete("/delete-item", isAuth, isRole("user"), menuController.delete);

module.exports = router;
