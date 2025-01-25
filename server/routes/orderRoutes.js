const orderController = require("../controller/orderController");
const express = require("express");
const router = express.Router();
const { isAuth } = require("../middlewares/auth/isAuth");
const isRole = require("../middlewares/auth/isRole");

router.post("/checkout", isAuth, orderController.checkout);
router.get(
  "/get-all-orders",
  isAuth,
  isRole("admin"),
  orderController.getAllorders
);

router.post(
  "/accept-order",
  isAuth,
  isRole("admin"),
  orderController.acceptOrder
);

router.post("/ship-order", isAuth, isRole("admin"), orderController.shipOrder);

router.post(
  "/deliver-order",
  isAuth,
  isRole("admin"),
  orderController.deliverOrder
);
router.post(
  "/cancel-order",
  isAuth,
  isRole("admin"),
  orderController.cancelOrder
);

module.exports = router;
