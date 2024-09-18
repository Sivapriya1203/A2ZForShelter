const SteelPost = require('../models/Steel');

// Create a new Steel Post
exports.createSteel = async (req, res) => {
  try {
    const { userId, name, email, phoneNumber, shopAddress, brand, steelCategory, steelType, steelThickness, meter, price, description } = req.body;

    // Handle image upload separately
    const images = req.files.map(file => file.path);

    const steelPost = new SteelPost({
      userId,
      name,
      email,
      phoneNumber,
      shopAddress,
      brand,
      steelCategory,
      steelType,
      steelThickness,
      meter,
      price,
      description,
      images
    });

    const savedPost = await steelPost.save();
    res.status(201).json(savedPost);
  } catch (error) {
    res.status(500).json({ message: 'Error creating steel post', error });
  }
};

exports.getAllSteel = async (req, res) => {
  try {
    const steel = await SteelPost.find();
    res.status(200).json(steel);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching catering posts', error });
  }
};


exports.getUserSteelData = async (req, res) => {
  // console.log("getuserdata");

  try {
    // Fetch houses based on the extracted userId
    const userId = req.userId

    const steel = await SteelPost.find({ userId: userId });
    //   console.log(houses);

    res.status(200).json(steel);
  } catch (error) {
    res.status(500).json({ message: "Error fetching houses data" });
  }
};

exports.getSteelById = async (req, res) => {
  try {
    const steel = await SteelPost.findById(req.params.id);
    if (!steel) {
      return res.status(404).json({ message: 'Steel post not found' });
    }
    res.json(steel);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// update Itme
exports.updateSteel = async (req, res) => {
  const { id } = req.params;
  try {
    const updated = await SteelPost.findByIdAndUpdate(id, req.body, { new: true });
    if (!updated) {
      return res.status(404).json({ message: "Steel service not found" });
    }
    res.status(200).json(updated);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Delete  Item
exports.deleteSteel = async (req, res) => {
  const { id } = req.params;
  try {
    const deleted = await SteelPost.findByIdAndDelete(id);
    if (!deleted) {
      return res.status(404).json({ message: "Steel service not found" });
    }
    res.status(200).json({ message: "Steel service deleted" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
