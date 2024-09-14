// controllers/landController.js
const Land = require("../models/land");

// @desc    Create new land ad
// @route   POST /api/land
// @access  Public
const createLand = async (req, res) => {
    try {
        // Extract data from request body
        const { userId, status, listedBy, landArea, facing, projectName, description, price, location, name, phoneNumber, purpose, facilities, stateName, districtName, cityName } = req.body;

        // Process file uploads
        const photos = req.files ? req.files.map(file => file.path) : [];

        // Create new land ad
        const landAd = new Land({
            userId,
            status,
            listedBy,
            landArea,
            facing,
            projectName,
            description,
            price,
            location,
            name,
            phoneNumber,
            purpose,
            facilities,
            stateName,
            districtName,
            cityName,
            photos
        });

        // Save to database
        await landAd.save();
        res.status(201).json({ message: "Land ad created successfully", landAd });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Failed to create land ad", error: error.message });
    }
};

module.exports = {
    createLand,
};
