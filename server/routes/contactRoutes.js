const contactController = require("../controller/contactController");
const express = require("express");
const router = express.Router();
const { isAuth } = require("../middlewares/auth/isAuth");
const isRole = require("../middlewares/auth/isRole");

const {
  contactsValidationRules,
} = require("../middlewares/validation/contactsValidation");
const {
  valdationResults,
} = require("../middlewares/validation/validationResult");

router.post(
  "/create-contact",
  contactsValidationRules,
  valdationResults,
  contactController.createContact
);
router.get(
  "/get-contacts",
  isAuth,
  isRole("admin"),
  contactController.getAllContacts
);
router.post(
  "/search-contacts",
  isAuth,
  isRole("admin"),
  contactController.searchContacts
);

module.exports = router;
