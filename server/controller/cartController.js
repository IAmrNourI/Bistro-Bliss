const Cart = require("../models/cart");
const MenuItem = require("../models/MenuItem");

exports.addToCart = async (req, res) => {
    try {
        const { menuItemId, quantity } = req.body;
        let totalPrice = 0;
        const menuItemData = await MenuItem.findOne({ _id: menuItemId});
        if (!menuItemData) {
            return res.status(404).json({ message: "Menu item not found", success: false });
        }
        itemPrice = menuItemData.price;
        const cart = await Cart.findOne({ user: req.user.id });
        if (cart) {
            let itemFound = false;
            cart.menuItems.map((item) => {
                if (item.menuItem == menuItemId) {
                    item.quantity += quantity;
                    itemFound = true;
                }
            })
            if (itemFound) {
                cart.totalPrice += itemPrice * quantity;
                await cart.save();
                return res.status(200).json({ message: "Added another one to cart", data: cart, success: true });
            }
            cart.menuItems = [...cart.menuItems, { menuItem: menuItemId, quantity: quantity}];
            cart.totalPrice += itemPrice * quantity;
            await cart.save();
            return res.status(200).json({ message: "Item added to cart", data: cart, success: true });
        }
        if (!cart) {
            totalPrice = itemPrice * quantity;
            const newCart = new Cart({ user: req.user.id, menuItems: [{ menuItem: menuItemId, quantity: quantity }], totalPrice });
            await newCart.save();
            return res.status(200).json({ message: "New cart created", data: newCart, success: true });
        }
    }catch(error) {
        res.status(500).json({ error: error.message, error: true });
    }
}

exports.getCart = async (req, res) => {
    try{ 
        const cart = await Cart.findOne({ user: req.user.id }).populate("menuItems.menuItem");
        if(!cart || cart.menuItems.length == 0){
            return res.status(404).json({ message: "Cart is Empty", error: true });
        }
        return res.status(200).json({ message: "Cart found", data: cart, success: true });
    }catch(error){
        res.status(500).json({ error: error.message, error: true });
    }
}

exports.deleteFromCart = async (req, res) => {
    try {
        const { menuItemId } = req.params;
        const cart = await Cart.findOne({ user: req.user.id })
        const menuItemData = await MenuItem.findOne({ _id: menuItemId});
        if (!menuItemData) {
            return res.status(404).json({ message: "Menu item not found", success: false });
        }
        itemPrice = menuItemData.price;
        if (!cart) {
            return res.status(404).json({ message: "Cart not found", success: false });
        }
        let totalPrice = cart.totalPrice;
        let foundItem = false;
        
        cart.menuItems.map((item)=>{
            if(item.menuItem == menuItemId){
                foundItem = true;
                totalPrice -= itemPrice * item.quantity;
                cart.menuItems = cart.menuItems.filter((item) => item.menuItem != menuItemId);
                cart.totalPrice = totalPrice;
                cart.save();
                return res.status(200).json({ message: "Item deleted from cart", data: cart, success: true });
            }
        });
        if(!foundItem){
            return res.status(404).json({ message: "Item not found in cart", success: false });
        }
    } catch (error) {
        res.status(500).json({ error: error.message, error: true });
    }
}

