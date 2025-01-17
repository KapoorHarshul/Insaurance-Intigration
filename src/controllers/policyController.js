const apiClient = require('../services/apiService');

const comparePolicies = async (req, res) => {
  try {
    const { coverage, premium, age } = req.body;

    const responses = await Promise.all([
      apiClient.post('/provider1/getQuotes', { coverage, premium, age }),
      apiClient.post('/provider2/getQuotes', { coverage, premium, age }),
    ]);

    const aggregatedResults = responses.map((response) => response.data);
    const sortedResults = aggregatedResults.flat().sort((a, b) => a.premium - b.premium);

    res.status(200).json({ results: sortedResults });
  } catch (error) {
    console.error('Error comparing policies:', error.message);
    res.status(500).json({ error: 'Failed to fetch policy quotes' });
  }
};

module.exports = { comparePolicies };
