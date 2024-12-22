const contactController = require("../controller/contactController");
const express = require("express");
const router = express.Router();

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
router.get("/get-contacts", contactController.getAllContacts);
router.post("/search-contacts", contactController.searchContacts);

module.exports = router;
