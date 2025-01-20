const axios = require('axios');

const apiClient = {
  post: async (url, data) => {
    try {
      const response = await axios.post(`http://example.com${url}`, data);
      return response;
    } catch (error) {
      throw error;
    }
  }
};

module.exports = apiClient;
