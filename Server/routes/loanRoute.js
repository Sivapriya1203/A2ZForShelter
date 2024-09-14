// backend/routes/loan.js
const express = require('express');
const { registerLoan } = require('../Controller/LoanController');
const router = express.Router();

// POST request to register loan dealer
router.post('/dealersregister', registerLoan);

module.exports = router;
