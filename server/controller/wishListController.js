const WishList = require("../models/wishList");

exports.addToWishList = async (req, res) => {
    try{
        const { menuItemId } = req.body;
        const wishList = await WishList.findOne({user: req.user.id});
        
        if(wishList){
            let itemFound = false;
            wishList.menuItems.map((item) => {
                console.log(item)
                if(item.menuItem == menuItemId){
                    itemFound = true;
                }
            })
            if(itemFound){
                return res.status(400).json({ message: "Item already in wishlist", error: true });
            }
            wishList.menuItems = [...wishList.menuItems, {menuItem: menuItemId}];
            await wishList.save();
            return res.status(200).json({ message: "Item added to wishlist", data: wishList, success: true });
        }
        if(!wishList){
            const newWishList = new WishList({ user: req.user.id, menuItems: [{menuItem: menuItemId}] });
            await newWishList.save();
            return res.status(200).json({ message: "New wishlist created", data: newWishList, success: true });
        }
    }catch(error){
        res.status(500).json({ message: error.message, error: true });
    }
}  

exports.getWishList = async (req, res) => {
    try{
        const wishList = await WishList.findOne({user: req.user.id}).populate("menuItems.menuItem");
        if(!wishList || wishList.menuItems.length == 0){
            return res.status(404).json({ message: "Wishlist is Empty", error: true });
        }
        
        return res.status(200).json({ message: "Wish list found", data: wishList, success: true });
    }catch(error){
        res.status(500).json({ message: error.message, error: true });
    }
}

exports.deleteFromWishList = async (req, res) => {
    try{
        const { menuItemId } = req.params;
        const wishList = await WishList.findOne({user: req.user.id});
        wishList.menuItems = wishList.menuItems.filter((item) => item.menuItem != menuItemId);
        await wishList.save();
        return res.status(200).json({ message: "Item deleted from wishlist", data: wishList, success: true });
    }catch(error){
        res.status(500).json({ message: error.message, error: true });
    }
}