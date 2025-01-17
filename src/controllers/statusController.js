const apiClient = require('../services/apiService');

const getProposalStatus = async (req, res) => {
    try {
        const { proposalId } = req.params;
        const response = await apiClient.get(`/getPolicyStatusV2/${proposalId}`);
        res.status(200).json(response.data);
    } catch (error) {
        res.status(500).json({ error: error.response.data });
    }
};

module.exports = { getProposalStatus };
