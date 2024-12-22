const ContactForm = require("../models/contactForm");

exports.createContact = async (req, res) => {
  try {
    const { name, email, subject, message } = req.body;
    const newContact = new ContactForm({ name, email, subject, message });
    await newContact.save();
    return res
      .status(200)
      .json({ message: "Message sent successfully", success: true });
  } catch (error) {
    res.status(500).json({ message: error.message, error: true });
  }
};

exports.getAllContacts = async (req, res) => {
  try {
    const contacts = await ContactForm.find().sort({ createdAt: -1 });
    return res
      .status(200)
      .json({
        message: "Contacts found successfully",
        success: true,
        contacts,
      });
  } catch (error) {
    res.status(500).json({ message: error.message, error: true });
  }
};

exports.searchContacts = async (req, res) => {
  try {
    const { search } = req.body;

    const query = new RegExp(search, "i", "g");

    const contacts = await ContactForm.find({
      $or: [{ name: query }, { email: query }, { subject: query}],
    }).sort({ createdAt: -1 });

    return res.status(200).json({
      message: "all contacts",
      data: contacts,
      success: true,
    });
  } catch (error) {
    return res.status(500).json({
      message: error.message,
      error: true,
    });
  }
};
