// controllers/kycController.js

const { perforCKYC } = require('../services/kycService');

const kycCheck = async (req, res) => {
  const { panNum, dob } = req.body;
  try {
    const result = await performKYC(panNum, dob);
    res.json(result);
  } catch (error) {
    res.status(500).json({ error: 'Failed to perform KYC', details: error.message });
  }
};

module.exports = { kycCheck };
