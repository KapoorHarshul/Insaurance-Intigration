const express = require('express');
const router = express.Router();
const quoteController = require('../controllers/quoteController');

router.post('/generate', quoteController.calculatePremium);

module.exports = router;
