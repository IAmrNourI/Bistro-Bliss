const express = require("express");
const router = express.Router();
const cartController = require("../controller/cartController");
const { isAuth } = require("../middlewares/auth/isAuth");

router.post("/add-to-cart", isAuth, cartController.addToCart);
router.get("/get-cart", isAuth, cartController.getCart);

router.delete("/remove-from-cart/:menuItemId", isAuth, cartController.deleteFromCart);


module.exports = router;
