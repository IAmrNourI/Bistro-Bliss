const Cart = require("../models/cart");
const Notification = require("../models/Notification");
const Order = require("../models/Order");
const User = require("../models/User");

exports.checkout = async (req, res) => {
  try {
    const { cartId } = req.body;
    const cart = await Cart.findOne({ _id: cartId });
    if (!cart) {
      return res.status(404).json({ message: "Cart not found", error: true });
    }
    if (!cart.menuItems) {
      // console.log(cart);
      return res.status(404).json({ message: "Cart is Empty", error: true });
    }
    // const order = await Order.findOne({
    //   user: req.user.id,
    //   $or: [
    //     { status: "pending" },
    //     { status: "preparing" },
    //     { status: "shipping" }
    //   ]
    // });

    // console.log(order);
    // if (order) {
    //   return res.status(400).json({ message: "You already have an active order", error: true });
    // }

    const newOrder = Order({
      user: req.user.id,
      menuItems: cart.menuItems,
      totalPrice: cart.totalPrice,
      status: "pending",
    });
    await newOrder.save();
    await Cart.findByIdAndDelete(cartId);

    const createdAt = new Date(newOrder.createdAt);
    const formattedDate = createdAt.toLocaleString("en-US", {
      weekday: "long",
      year: "numeric",
      month: "long",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });

    const newNotification = await Notification.create({
      user: newOrder.user,
      content: `Your created Order at ${formattedDate} your estimated time is 35min`,
      status: "Pending",
      unseen: true,
    });
    await newNotification.save();

    // console.log(cart);
    return res
      .status(200)
      .json({ message: "The Order Created successfully", cart, success: true });
  } catch (error) {
    return res.status(404).json({ messeage: error.message, error: true });
  }
};

exports.getAllorders = async (req, res) => {
  try {
    const order = await Order.find()
      .populate("menuItems.menuItem", "-createdAt -updatedAt -__v")
      .sort({ createdAt: -1 });
    // console.log(order);
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
    const { orderId, hours, minutes } = req.body;
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
    order.status = "preparing";
    estimatedTime =
      new Date(Date.now() + (hours) * 1000 * 60 * 60 + minutes * 1000 * 60);
    order.estimatedTime = estimatedTime;
    await order.save();
    console.log("estimated time", estimatedTime);
    

    formatedEstimatedTime = estimatedTime.toLocaleString("en-US", {
      hour: "2-digit",
      minute: "2-digit",
    });
    console.log( "form Estimated", formatedEstimatedTime);
    const createdAt = new Date(order.createdAt);
    const formattedDate = createdAt.toLocaleString("en-US", {
      weekday: "long",
      year: "numeric",
      month: "long",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
    console.log("order. createdAt: ", order.createdAt);
    console.log("formattedDate: ", formattedDate);
    console.log("createdAt: ", createdAt);

    const newNotification = await Notification.create({
      user: order.user,
      content: `We Just Recived your Order that you created at ${formattedDate}, We are preparing it, Your Estimated time is ${formatedEstimatedTime}`,
      status: "Preparing",
      unseen: true,
    });
    await newNotification.save();

    const user = await User.findById(order.user);
    user.unSeenMessages += 1;
    await user.save();

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
    if (order.status !== "preparing") {
      return res.status(404).json({
        message: `Order is already ${order.status}, you can't deliver it, you can only deliver preparing orders`,
        error: true,
      });
    }
    order.status = "shipping";
    await order.save();

    const createdAt = new Date(order.createdAt);
    const formattedDate = createdAt.toLocaleString("en-US", {
      weekday: "long",
      year: "numeric",
      month: "long",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });

    const newNotification = await Notification.create({
      user: order.user,
      content: `Your Order you created at ${formattedDate} is Shipping to you`,
      status: "Shipping",
      unseen: true,
    });
    await newNotification.save();

    const user = await User.findById(order.user);
    user.unSeenMessages += 1;
    await user.save();

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

    const createdAt = new Date(order.createdAt);
    const formattedDate = createdAt.toLocaleString("en-US", {
      weekday: "long",
      year: "numeric",
      month: "long",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });

    const newNotification = await Notification.create({
      user: order.user,
      content: `Your Order created on ${formattedDate} is Delivered to you`,
      status: "Delivered",
      unseen: true,
    });
    await newNotification.save();

    const user = await User.findById(order.user);
    user.unSeenMessages += 1;
    await user.save();

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

    const createdAt = new Date(order.createdAt);
    const formattedDate = createdAt.toLocaleString("en-US", {
      weekday: "long",
      year: "numeric",
      month: "long",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });

    const newNotification = await Notification.create({
      user: order.user,
      content: `Your Order you created at ${formattedDate} has been cancelled`,
      status: "Cancelled",
      unseen: true,
    });
    await newNotification.save();

    const user = await User.findById(order.user);
    user.unSeenMessages += 1;
    await user.save();

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

exports.getActiveOrders = async (req, res) => {
  try {
    const activeOrders = await Order.find({
      user: req.user.id,
      $or: [
        { status: "pending" },
        { status: "preparing" },
        { status: "shipping" },
      ],
    })
      .sort({ createdAt: -1 })
      .populate("menuItems.menuItem", "-createdAt -updatedAt -__v");

    if (!activeOrders) {
      return res
        .status(404)
        .json({ message: "No active Order found", error: true });
    }
    return res.status(200).json({
      message: "The active Order found successfully",
      activeOrders,
      success: true,
    });
  } catch (error) {
    return res.status(404).json({ messeage: error.message, error: true });
  }
};

exports.getOrdersHistory = async (req, res) => {
  try {
    const historyOrders = await Order.find({
      user: req.user.id,
      $or: [{ status: "delivered" }, { status: "cancelled" }],
    })
      .sort({ createdAt: -1 })
      .populate("menuItems.menuItem", "-createdAt -updatedAt -__v");

    if (!historyOrders) {
      return res
        .status(404)
        .json({ message: "No Orders History found", error: true });
    }

    return res.status(200).json({
      message: "The Orders History found successfully",
      historyOrders,
      sucess: true,
    });
  } catch (error) {
    return res.status(404).json({ messeage: error.message, error: true });
  }
};
