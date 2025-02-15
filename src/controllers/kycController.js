const { performKYC } = require('../services/kycService');

const kycCheck = async (req, res) => {
    try {
        console.log("🔍 KYC request received:", JSON.stringify(req.kycData, null, 2));

        // Perform KYC using the pre-validated payload from the middleware
        const response = await performKYC(req.kycData);

        res.json(response); // Return API response
    } catch (error) {
        console.error("❌ KYC Check Error:", error.message);
        res.status(400).json({ error: error.message });
    }
};

module.exports = { kycCheck };
