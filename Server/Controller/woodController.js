const Wood = require('../models/Wood');

// Create a new Wood Post
exports.createWood = async (req, res) => {
    try {
        const {
            userId,
            name,
            email,
            phoneNumber,
            sellerAddress,
            wood,
            thickness,
            quantityType,
            quantity,
            price,
            description,
        } = req.body;

        // Handle image upload
        const images = req.files.map((file) => file.path);

        const woodPost = new Wood({
            userId,
            name,
            email,
            phoneNumber,
            sellerAddress,
            wood,
            thickness,
            quantityType,
            quantity,
            price,
            description,
            images,
        });

        const savedPost = await woodPost.save();
        res.status(201).json(savedPost);
    } catch (error) {
        res.status(500).json({ message: 'Error creating wood post', error });
    }
};


exports.getAllWood = async (req, res) => {
    try {
        const wood = await Wood.find();
        res.status(200).json(wood);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching catering posts', error });
    }
};

exports.getUserWoodData = async (req, res) => {
    // console.log("getuserdata");

    try {
        // Fetch wood based on the extracted userId
        const userId = req.userId

        const wood = await Wood.find({ userId: userId });
        //   console.log(wood);

        res.status(200).json(wood);
    } catch (error) {
        res.status(500).json({ message: "Error fetching houses data" });
    }
};


exports.getWoodById = async (req, res) => {
    try {
        const wood = await Wood.findById(req.params.id);
        if (!wood) {
            return res.status(404).json({ message: 'Wood post not found' });
        }
        res.json(wood);
    } catch (error) {
        res.status(500).json({ message: 'Server error', error });
    }
};

// update Itme
exports.updateWood = async (req, res) => {
    const { id } = req.params;
    try {
        const updated = await Wood.findByIdAndUpdate(id, req.body, { new: true });
        if (!updated) {
            return res.status(404).json({ message: "Wood service not found" });
        }
        res.status(200).json(updated);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

// Delete  Item
exports.deleteWood = async (req, res) => {
    const { id } = req.params;
    try {
        const deleted = await Wood.findByIdAndDelete(id);
        if (!deleted) {
            return res.status(404).json({ message: "Wood service not found" });
        }
        res.status(200).json({ message: "Wood service deleted" });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};
