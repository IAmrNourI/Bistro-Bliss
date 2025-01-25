const Cart = require("../models/cart");
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
    const order = await Order.find();
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
      return res
        .status(404)
        .json({
          message: `Order is already ${order.status}, you can't accept it, you can only accept pending orders`,
          error: true,
        });
    }
    order.status = "pereparing";
    await order.save();
    return res
      .status(200)
      .json({
        message: "The Order accepted successfully",
        order,
        success: true,
      });
  } catch (error) {
    return res.status(404).json({ messeage: error.message, error: true });
  }
};

exports.shipOrder = async (req, res) => {
    try{
        const { orderId } = req.body;
        const order = await Order.findOne({ _id: orderId });
        if(!order){
            return res.status(404).json({ message: "Order not found", error: true });
        }
        if(order.status !== "pereparing"){
            return res.status(404).json({
                message: `Order is already ${order.status}, you can't deliver it, you can only deliver pereparing orders`,
                error: true,
            });
        }
        order.status = "shipping";
        await order.save();
        return res
        .status(200)
        .json({
            message: "The Order is being shipping successfully",
            order,
            success: true,
        });
    }catch(error){
        return res.status(404).json({ messeage: error.message, error: true });
    }
}

exports.deliverOrder = async (req, res)=> {
    try{
        const { orderId } = req.body;
        const order = await Order.findOne({ _id: orderId });
        if(!order){
            return res.status(404).json({ message: "Order not found", error: true });
        }
        if(order.status !== "shipping"){
            return res.status(404).json({
                message: `Order is already ${order.status}, you can't deliver it, you can only deliver shipping orders`,
                error: true,
            });
        }
        order.status = "delivered";
        await order.save();
        return res
        .status(200)
        .json({
            message: "The Order delivered successfully",
            order,
            success: true,
        });
    }catch(error){
        return res.status(404).json({ messeage: error.message, error: true });
    }
}

exports.cancelOrder = async (req, res) => {
    try{
        const { orderId } = req.body;
        const order = await Order.findOne({ _id: orderId });
        if(!order){
            return res.status(404).json({ message: "Order not found", error: true });
        }
        if(order.status !== "pending"){
            return res.status(404).json({
                message: `Order is already ${order.status}, you can't cancel it, you can only cancel pending orders`,
                error: true,
            });
        }
        order.status = "cancelled";
        await order.save();
        return res
        .status(200)
        .json({
            message: "The Order canceled successfully",
            order,
            success: true,
        });
    }catch(error){
        return res.status(404).json({ messeage: error.message, error: true });
    }
}

