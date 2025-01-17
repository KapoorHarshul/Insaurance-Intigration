const { getConnection } = require('../services/dbService');

const getPincodes = async (req, res) => {
  try {
    const { city, state } = req.body;

    const connection = await getConnection();
    let query = 'SELECT * FROM pincodes WHERE 1=1';
    const params = [];

    if (city) {
      query += ' AND city = ?';
      params.push(city);
    }

    if (state) {
      query += ' AND state = ?';
      params.push(state);
    }

    const [rows] = await connection.execute(query, params);

    // Ensure a proper JSON response
    res.status(200).json(rows);
  } catch (error) {
    console.error('Error fetching pincodes:', error.message);
    res.status(500).json({ error: 'Failed to fetch pincode data' });
  }
};

module.exports = { getPincodes };
