const apiClient = require('../services/apiService');

const generatePartnerToken = async (req, res) => {
  try {
    // Call the API to generate a token
    const response = await apiClient.post('/generatePartnerToken');
    const token = response.data.token; // Assuming the token is in the 'data' property
    res.status(200).json({ token });
  } catch (error) {
    // Enhanced error handling
    console.error('Error generating token:', error.message);

    // Check if error.response exists
    const status = error.response?.status || 500;
    const message = error.response?.data?.message || 'An unexpected error occurred';

    res.status(status).json({ error: message });
  }
};

module.exports = { generatePartnerToken };
