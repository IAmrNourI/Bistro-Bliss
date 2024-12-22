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
  "/create",
  contactsValidationRules,
  valdationResults,
  contactController.createContact
);
router.get("/getContacts", contactController.getAllContacts);
router.post("/searchContacts", contactController.searchContacts);

module.exports = router;
