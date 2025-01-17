const apiClient = require('../services/apiService');

const downloadCOI = async (req, res) => {
    try {
        const { proposalId } = req.params;
        const response = await apiClient.get(`/getPolicyPDFV2/${proposalId}`);
        res.status(200).send(response.data);
    } catch (error) {
        res.status(500).json({ error: error.response.data });
    }
};

module.exports = { downloadCOI };
