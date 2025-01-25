const express = require("express");
const router = express.Router();
const wishListController = require("../controller/wishListController");
const { isAuth } = require("../middlewares/auth/isAuth");

router.post("/add-to-wishlist", isAuth, wishListController.addToWishList);
router.get("/get-wishlist", isAuth, wishListController.getWishList);
router.delete("/delete-from-wishlist/:menuItemId", isAuth, wishListController.deleteFromWishList);

module.exports = router;
