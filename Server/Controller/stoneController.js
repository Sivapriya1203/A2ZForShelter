const Stone = require('../models/Stone');

// Create a new Stone Post
exports.createStone = async (req, res) => {
  try {
    const {
      userId,
      name,
      email,
      phoneNumber,
      sellerAddress,
      stoneCategory,
      stoneType,
      quantity,
      price,
      description,
    } = req.body;

    // Store image paths
    const images = req.files.map((file) => file.path);

    const stonePost = new Stone({
      userId,
      name,
      email,
      phoneNumber,
      sellerAddress,
      stoneCategory,
      stoneType,
      quantity,
      price,
      description,
      images,
    });

    const savedPost = await stonePost.save();
    res.status(201).json(savedPost);
  } catch (error) {
    res.status(500).json({ message: 'Error creating stone post', error });
  }
};
exports.getAllStone = async (req, res) => {
  try {
    const stone = await Stone.find();
    res.status(200).json(stone);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching catering posts', error });
  }
};


exports.getUserStoneData = async (req, res) => {
  // console.log("getuserdata");

  try {
    // Fetch stone based on the extracted userId
    const userId = req.userId

    const stone = await Stone.find({ userId: userId });
    //   console.log(stone);

    res.status(200).json(stone);
  } catch (error) {
    res.status(500).json({ message: "Error fetching houses data" });
  }
};


exports.getStoneById = async (req, res) => {
  try {
    const stone = await Stone.findById(req.params.id);
    if (!stone) {
      return res.status(404).json({ message: 'Stone post not found' });
    }
    res.status(200).json(stone);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// update Itme
exports.updateStone = async (req, res) => {
  const { id } = req.params;
  try {
    const updated = await Stone.findByIdAndUpdate(id, req.body, { new: true });
    if (!updated) {
      return res.status(404).json({ message: "Stone service not found" });
    }
    res.status(200).json(updated);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Delete  Item
exports.deleteStone = async (req, res) => {
  const { id } = req.params;
  try {
    const deleted = await Stone.findByIdAndDelete(id);
    if (!deleted) {
      return res.status(404).json({ message: "Stone service not found" });
    }
    res.status(200).json({ message: "Stone service deleted" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
