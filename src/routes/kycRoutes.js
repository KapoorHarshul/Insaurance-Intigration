const express = require('express');
const { kycCheck } = require('../controllers/kycController');
const { validateKYCRequest } = require('../middleware/kycMiddleware'); // Import middleware

const router = express.Router();

// Add middleware to validate KYC request before processing
router.post('/check-kyc', validateKYCRequest, kycCheck);

module.exports = router;
