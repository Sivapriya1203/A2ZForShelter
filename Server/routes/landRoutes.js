// routes/landRoutes.js
const express = require("express");
const { createLand } = require("../Controller/landController");
const multer = require("multer");
const router = express.Router();

// Multer setup for file uploads
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, "uploads/"); // Specify the directory where files should be stored
    },
    filename: function (req, file, cb) {
        cb(null, Date.now() + "-" + file.originalname); // Generate unique filenames
    },
});
const upload = multer({ storage });

// Route for posting a new land ad
router.post("/land", upload.array("photos", 20), createLand);

module.exports = router;
