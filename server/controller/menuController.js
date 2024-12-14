const MenuItem = require("../models/MenuItem");


exports.getAllItems = async (req, res) => {
    try{
        const items = await MenuItem.find();
        return res.status(200).json({ message: "Items found successfully", success: true, items });
    }catch (error) {
        res.status(500).json({ message: error.message, error: true });
    }
}

exports.add = async (req, res) => {
    try {
        const { name, price, category, description, image  } = req.body;
        const newItem = new MenuItem({ name, price, category, description, image });
        await newItem.save();
        return res.status(200).json({ message: "Item added successfully", success: true, newItem });
    }catch (error) {
        res.status(500).json({ message: error.message, error: true });
    }
}

exports.edit = async (req, res) => {
    try {
        const { id, name, price, category, description, image } = req.body;
        const updatedItem = await MenuItem.findByIdAndUpdate(id, { name, price, category, description, image }, { new: true });
        return res.status(200).json({ message: "Item updated successfully", success: true, updatedItem });
    }catch (error) {
        res.status(500).json({ message: error.message, error: true });
    }
}

exports.delete = async (req, res) => {
    try {
        cosnt = {id} = req.body;
        await MenuItem.findByIdAndDelete(id);
        return res.status(200).json({ message: "Item deleted successfully", success: true });
    }catch (error) {
        res.status(500).json({ message: error.message, error: true });
    }
}