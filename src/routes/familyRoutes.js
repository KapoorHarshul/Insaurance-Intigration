const express = require('express');
const { calculateQuotes } = require('../controllers/familyController');
const validateFamilyDetails = require('../middleware/validateFamilyDetails'); // Optional validation

const router = express.Router();

router.post('/family', validateFamilyDetails, calculateQuotes);

module.exports = router;
