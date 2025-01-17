const express = require('express');
const { getPincodes } = require('../controllers/pincodeController');

const router = express.Router();

// POST /pincode/query
router.post('/query', getPincodes);

module.exports = router;
