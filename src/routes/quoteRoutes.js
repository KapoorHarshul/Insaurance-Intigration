const express = require('express');
const router = express.Router();
const quoteController = require('../controllers/quoteController');

router.post('/generate-quotes', quoteController.generateQuotes);

module.exports = router;
