const express = require('express');
const { initiateRazorpayPayment, initiateStripePayment } = require('../controllers/paymentController');

const router = express.Router();

// Razorpay route
router.post('/razorpay/initiate', initiateRazorpayPayment);

// Stripe route
router.post('/stripe/initiate', initiateStripePayment);

module.exports = router;
