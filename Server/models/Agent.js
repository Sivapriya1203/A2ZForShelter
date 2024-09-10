// models/Agent.js
const mongoose = require('mongoose');

const AgentSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User', // assuming you have a User model
        required: true,
    },
    firstName: {
        type: String,
        required: true,
    },
    lastName: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
        unique: true,
    },
    companyName: {
        type: String,
    },
    phoneNumber: {
        type: String,
        required: true,
    },
    productInterest: {
        type: String,
    },
    images: [{ type: String, required: true }]
}, { timestamps: true });

const Agent = mongoose.model('Agent', AgentSchema);

module.exports = Agent;
