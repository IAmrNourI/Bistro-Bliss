const MenuItem = require("../models/MenuItem");

exports.getAllItems = async (req, res) => {
  try {
    const items = await MenuItem.find();
    return res
      .status(200)
      .json({ message: "Items found successfully", success: true, items });
  } catch (error) {
    res.status(500).json({ message: error.message, error: true });
  }
};

exports.add = async (req, res) => {
  try {
    const { name, price, category, description, image } = req.body;

    const newItem = new MenuItem({ name, price, category, description, image });
    await newItem.save();
    return res
      .status(200)
      .json({ message: "Item added successfully", success: true, newItem });
  } catch (error) {
    res.status(500).json({ message: error.message, error: true });
  }
};

exports.edit = async (req, res) => {
  try {
    const { id, name, price, category, description, image } = req.body;
    const updatedItem = await MenuItem.findByIdAndUpdate(
      id,
      { name, price, category, description, image },
      { new: true }
    );

    if (!updatedItem) {
      return res.status(404).json({ message: "Item not found" });
    }

    return res
      .status(200)
      .json({
        message: "Item updated successfully",
        success: true,
        updatedItem,
      });
  } catch (error) {
    res.status(500).json({ message: error.message, error: true });
  }
};

exports.delete = async (req, res) => {
  try {
    cosnt = { id } = req.body;
    const deletedItem = await MenuItem.findByIdAndDelete(id);
    if (!deletedItem) {
      return res.status(404).json({ message: "Item not found" });
    }
    return res
      .status(200)
      .json({ message: "Item deleted successfully", success: true });
  } catch (error) {
    res.status(500).json({ message: error.message, error: true });
  }
};

exports.searchItems = async (req, res) => {
  try {
    const { search } = req.body;

    const query = new RegExp(search, "i", "g");

    const items = await MenuItem.find({
      $or: [{ name: query }, { description: query }, { category: query }],
    }).sort({ name: 1 });

    return res.status(200).json({
      message: "all menu items found",
      data: items,
      success: true,
    });
  } catch (error) {
    return res.status(500).json({
      message: error.message,
      error: true,
    });
  }
};

exports.uploadFile = async (req, res) => {
  try {
    if (!req.file) {
      //req.file without s if single file in routes
      return res.status(400).json({ message: "No file uploaded" });
    }

    const normalizedPath = req.file.path.replace(/\\+/g, '/').replace(/\/+/g, '/');
    return res
      .status(200)
      .json({
        message: "File Successfully Uploaded",
        //file: req.file,
        path: req.file.path,
        normalizedPath: normalizedPath,
      }); //file if single file
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};
