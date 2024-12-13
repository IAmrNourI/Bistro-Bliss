const Menu = require("../models/Menu");


exports.getAllItems = async (req, res) => {
    try{
        const items = await Menu.find();
        return res.status(200).json({ message: "Items found successfully", success: true, items });
    }catch (error) {
        res.status(500).json({ message: error.message, error: true });
    }
}

exports.add = async (req, res) => {
    try {
        const { name, price, category  } = req.body;
        const newItem = new Menu({ name, price, category });
        await newItem.save();
        return res.status(200).json({ message: "Item added successfully", success: true, newItem });
    }catch (error) {
        res.status(500).json({ message: error.message, error: true });
    }
}

exports.edit = async (req, res) => {
    try {
        const { id, name, price, category } = req.body;
        const updatedItem = await Menu.findByIdAndUpdate(id, { name, price, category }, { new: true });
        return res.status(200).json({ message: "Item updated successfully", success: true, updatedItem });
    }catch (error) {
        res.status(500).json({ message: error.message, error: true });
    }
}

exports.delete = async (req, res) => {
    try {
        cosnt = {id} = req.body;
        await Menu.findByIdAndDelete(id);
        return res.status(200).json({ message: "Item deleted successfully", success: true });
    }catch (error) {
        res.status(500).json({ message: error.message, error: true });
    }
}