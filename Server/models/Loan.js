// backend/models/loan.js
const mongoose = require('mongoose');

const loanSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true,
    },
    Name: { type: String, required: true },
    email: { type: String, required: true },
    BankDearlerName: { type: String },
    phoneNumber: { type: String, required: true },
    description: { type: String },
    loanType: { type: String, required: true },
});

module.exports = mongoose.model('Loan', loanSchema);
