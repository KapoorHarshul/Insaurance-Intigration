// routes/kycRoutes.js

const express = require('express');
const router = express.Router();
const { kycCheck } = require('../controllers/kycController');

// Define the route for KYC check
router.post('/check-kyc', kycCheck);

module.exports = router;
