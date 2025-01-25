const express = require("express");
const router = express.Router();
const wishListController = require("../controller/wishListController");
const { isAuth } = require("../middlewares/auth/isAuth");

module.exports = router;
