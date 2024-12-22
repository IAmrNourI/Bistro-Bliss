const express = require("express");
const router = express.Router();
const menuController = require("../controller/menuController");
const {
  itemValidationRules,
  itemUpdateValidationRules,
  itemDeleteValidationRules,
} = require("../middlewares/validation/itemsValidation");
const {
  valdationResults,
} = require("../middlewares/validation/validationResult");
const { isAuth } = require("../middlewares/auth/isAuth");
const isRole = require("../middlewares/auth/isRole");

router.get("/", menuController.getAllItems);

router.post(
  "/add-item",
  //isAuth,
  //isRole("admin"),
  itemValidationRules,
  valdationResults,
  menuController.add
);

router.put(
  "/edit-item",
  //isAuth,
  //isRole("admin"),
  itemUpdateValidationRules,
  valdationResults,
  menuController.edit
);

router.delete(
  "/delete-item",
  //isAuth,
  //isRole("admin"),
  itemDeleteValidationRules,
  valdationResults,
  menuController.delete
);

router.post(
  "/search-item",
  menuController.searchItems,
)

module.exports = router;
