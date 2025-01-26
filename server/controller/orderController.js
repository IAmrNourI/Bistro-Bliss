const Cart = require("../models/cart");
const Notification = require("../models/Notification");
const Order = require("../models/Order");

exports.checkout = async (req, res) => {
  try {
    const { cartId } = req.body;
    const cart = await Cart.findOne({ _id: cartId });
    if (!cart) {
      return res.status(404).json({ message: "Cart not found", error: true });
    }
    if (!cart.menuItems) {
      console.log(cart);
      return res.status(404).json({ message: "Cart is Empty", error: true });
    }

    const newOrder = Order({
      user: req.user.id,
      menuItems: cart.menuItems,
      totalPrice: cart.totalPrice,
      status: "pending",
    });
    await newOrder.save();
    await Cart.findByIdAndDelete(cartId);

    const newNotification = await Notification.create({
        user: newOrder.user,
        content: `Your created at ${newOrder.createdAt} your estimated time is 35min`,
        status: "Pending",
        unseen: true,
      });
      await newNotification.save();

    console.log(cart);
    return res
      .status(200)
      .json({ message: "The Order Created successfully", cart, success: true });
  } catch (error) {
    return res.status(404).json({ messeage: error.message, error: true });
  }
};

exports.getAllorders = async (req, res) => {
  try {
    const order = await Order.find().populate(
      "menuItems.menuItem",
      "-createdAt -updatedAt -__v"
    );
    console.log(order);
    if (!order) {
      return res.status(404).json({ message: "No Orders found", error: true });
    }
    return res
      .status(200)
      .json({ message: "The Order found successfully", order, success: true });
  } catch (error) {
    return res.status(404).json({ messeage: error.message, error: true });
  }
};

exports.acceptOrder = async (req, res) => {
  try {
    const { orderId } = req.body;
    const order = await Order.findOne({ _id: orderId });
    if (!order) {
      return res.status(404).json({ message: "Order not found", error: true });
    }
    if (order.status !== "pending") {
      return res.status(404).json({
        message: `Order is already ${order.status}, you can't accept it, you can only accept pending orders`,
        error: true,
      });
    }
    order.status = "pereparing";
    await order.save();

    const newNotification = await Notification.create({
      user: order.user,
      content: `We Just Recived your Order that you created at ${order.createdAt}, We are pereparing it`,
      status: "Pereparing",
      unseen: true,
    });
    await newNotification.save();

    return res.status(200).json({
      message: "The Order accepted successfully",
      order,
      success: true,
    });
  } catch (error) {
    return res.status(404).json({ messeage: error.message, error: true });
  }
};

exports.shipOrder = async (req, res) => {
  try {
    const { orderId } = req.body;
    const order = await Order.findOne({ _id: orderId });
    if (!order) {
      return res.status(404).json({ message: "Order not found", error: true });
    }
    if (order.status !== "pereparing") {
      return res.status(404).json({
        message: `Order is already ${order.status}, you can't deliver it, you can only deliver pereparing orders`,
        error: true,
      });
    }
    order.status = "shipping";
    await order.save();

    const newNotification = await Notification.create({
      user: order.user,
      content: `Your Order you created at ${order.createdAt} is Shipping to you`,
      status: "Shipping",
      unseen: true,
    });
    await newNotification.save();

    return res.status(200).json({
      message: "The Order is being shipping successfully",
      order,
      success: true,
    });
  } catch (error) {
    return res.status(404).json({ messeage: error.message, error: true });
  }
};

exports.deliverOrder = async (req, res) => {
  try {
    const { orderId } = req.body;
    const order = await Order.findOne({ _id: orderId });
    if (!order) {
      return res.status(404).json({ message: "Order not found", error: true });
    }
    if (order.status !== "shipping") {
      return res.status(404).json({
        message: `Order is already ${order.status}, you can't deliver it, you can only deliver shipping orders`,
        error: true,
      });
    }
    order.status = "delivered";
    await order.save();

    const newNotification = await Notification.create({
      user: order.user,
      content: `Your Order you created at ${order.createdAt} is Delivered to you`,
      status: "Delivered",
      unseen: true,
    });
    await newNotification.save();

    return res.status(200).json({
      message: "The Order delivered successfully",
      order,
      success: true,
    });
  } catch (error) {
    return res.status(404).json({ messeage: error.message, error: true });
  }
};

exports.cancelOrder = async (req, res) => {
  try {
    const { orderId } = req.body;
    const order = await Order.findOne({ _id: orderId });
    if (!order) {
      return res.status(404).json({ message: "Order not found", error: true });
    }
    if (order.status !== "pending") {
      return res.status(404).json({
        message: `Order is already ${order.status}, you can't cancel it, you can only cancel pending orders`,
        error: true,
      });
    }
    order.status = "cancelled";
    await order.save();

    const newNotification = await Notification.create({
      user: order.user,
      content: `Your Order you created at ${order.createdAt} has been cancelled`,
      status: "Cancelled",
      unseen: true,
    });
    await newNotification.save();

    return res.status(200).json({
      message: "The Order canceled successfully",
      order,
      success: true,
    });
  } catch (error) {
    return res.status(404).json({ messeage: error.message, error: true });
  }
};

exports.getUserOrders = async (req, res) => {
  try {
    const orders = await Order.find({ user: req.user.id }).populate(
      "menuItems.menuItem",
      "-createdAt -updatedAt -__v"
    );
    if (!orders) {
      return res.status(404).json({ message: "No Orders found", error: true });
    }
    return res
      .status(200)
      .json({ message: "The Order found successfully", orders, success: true });
  } catch (error) {
    return res.status(404).json({ messeage: error.message, error: true });
  }
};

