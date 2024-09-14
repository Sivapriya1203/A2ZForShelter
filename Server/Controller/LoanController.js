// backend/controllers/loanController.js
const Loan = require('../models/Loan');

// Handle form submission
exports.registerLoan = async (req, res) => {
    console.log(req.data);

    try {
        const { userId, Name, email, BankDearlerName, phoneNumber, description, loanType } = req.body;

        // Create new loan entry
        const newLoan = new Loan({
            userId,
            Name,
            email,
            BankDearlerName,
            phoneNumber,
            description,
            loanType,
        });

        await newLoan.save(); // Save to the database
        res.status(201).json({ message: 'Loan dealer registered successfully!' });
    } catch (error) {
        res.status(500).json({ error: 'Failed to register loan dealer' });
    }
};
