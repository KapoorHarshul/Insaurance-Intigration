const express = require('express');
const router = express.Router();
const { downloadPolicyPDF } = require('../controllers/pdfController');

router.get('/download-coi/:customerId/:policyId', downloadPolicyPDF);

module.exports = router;
