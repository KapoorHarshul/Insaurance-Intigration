const express = require('express');
const router = express.Router();
const { createPolicy } = require('../controllers/policyController'); // Ensure correct path

router.post('/policies', createPolicy);

module.exports = router;
