const express = require('express');
const router = express.Router();
const { fetchPolicyPDF } = require('../services/apiService');

// Endpoint to download PDF
router.get('/download-coi/:policyNum', async (req, res) => {
    const policyNum = req.params.policyNum;
    try {
        const pdfData = await fetchPolicyPDF(policyNum);
        res.status(200).send(pdfData);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

module.exports = router;
