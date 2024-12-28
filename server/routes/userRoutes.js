const express = require("express");
const router = express.Router();
const userController = require("../controller/userControllser");
const { isAuth } = require("../middlewares/auth/isAuth");
const isRole = require("../middlewares/auth/isRole");

const {
  userValidationRules,
  updateUserValidationRules,
} = require("../middlewares/validation/UserValidation");

const { valdationResults } = require("../middlewares/validation/validationResult");

router.post(
  "/register",
  userValidationRules,
  valdationResults,
  userController.register
);

router.post("/verify-otp", userController.verifyOtp);
router.post("/resend-otp", userController.resendOtp);

router.post("/email", userController.verifyEmail);
router.post("/password", userController.verifyPassword);

router.get("/user-details", isAuth, userController.userDetails);

router.get("/logout", isAuth, userController.logout);

router.put(
  "/update-user",
  isAuth,
  updateUserValidationRules,
  valdationResults,
  userController.updateUser
);

router.post("/search-user", isAuth, isRole("admin"), userController.searchUser);

router.get("/get-all-users", isAuth, isRole("admin"), userController.getAllUsers)

module.exports = router;
