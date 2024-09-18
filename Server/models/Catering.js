const mongoose = require('mongoose');

const cateringSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true,
      },
  name: { type: String, required: true },
  email: { type: String, required: true },
  phoneNumber: { type: String, required: true },
  shopAddress: { type: String, required: true },
  meals: { type: String, required: true },
  menuCatlogues: { type: String, required: true },
  numberOfPeople: { type: Number, required: true },
  price: { type: Number, required: true },
  description: { type: String, required: true },
  images: [{ type: String, required: true }], // Store paths to uploaded images
}, { timestamps: true });

const Catering = mongoose.model('Catering', cateringSchema);

module.exports = Catering;
