const express = require('express');
const { comparePolicies } = require('../controllers/policyController');
const { registerUser, loginUser } = require('../controllers/userController');
const { initiatePayment, confirmPayment } = require('../controllers/paymentController');

const router = express.Router();

router.post('/policies/compare', comparePolicies);
router.post('/auth/register', registerUser);
router.post('/auth/login', loginUser);
router.post('/payments/initiate', initiatePayment);
router.post('/payments/confirm', confirmPayment);

module.exports = router;
