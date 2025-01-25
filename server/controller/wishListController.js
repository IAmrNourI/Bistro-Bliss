const WishList = require("../models/wishList");

exports.addToWishList = async (req, res) => {
    try{
        const { menuItemId } = req.body;
        const wishList = WishList.findOne({user: req.user.id});
        if(wishList){
            wishList.items.push(menuItemId);
            await wishList.save();
            return res.status(200).json({ message: "Item added to wishlist", data: wishList });
        }
        if(!wishList){
            const newWishList = new WishList({ user: req.user.id, items: [menuItemId] });
            await newWishList.save();
            return res.status(200).json({ message: "New wishlist created", data: newWishList });
        }
    }catch(error){
        res.status(500).json({ message: error.message, error: true });
    }
}