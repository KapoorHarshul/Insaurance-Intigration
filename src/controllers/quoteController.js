const quoteService = require('../services/quoteService');

exports.generateQuotes = async (req, res) => {
    const { coverage, premium, age } = req.body;
    try {
        if (!coverage || !premium || !age) {
            return res.status(400).json({ error: 'Missing required parameters for quote generation.' });
        }

        const quotes = await quoteService.getQuotes(coverage, premium, age);
        const sortedQuotes = quotes.sort((a, b) => a.premium - b.premium);
        res.status(200).json(sortedQuotes);
    } catch (error) {
        console.error('Error generating quotes:', error.message);
        res.status(500).json({ error: 'Failed to fetch policy quotes' });
    }
};
