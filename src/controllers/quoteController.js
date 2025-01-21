// quoteController.js
exports.calculatePremium = (req, res) => {
    try {
        const inputData = req.body;
        let basePremium = calculateBasePremium(100, inputData); // Start with a base rate and adjust based on input
        let finalPremium = calculateFeaturePremium(basePremium, inputData.features);
        res.json({ quote: `$${finalPremium.toFixed(2)}` });
    } catch (error) {
        console.error("Error calculating premium:", error);
        res.status(500).json({ error: "Error calculating premium, please try again later." });
    }
};

const calculateBasePremium = (baseRate, inputData) => {
    let premium = baseRate;
    premium += inputData.adultsCount * 50; // Additional cost per adult
    premium += inputData.childrenCount * 30; // Additional cost per child
    premium += inputData.age > 50 ? 75 : 0; // Higher rates for older primary applicant
    return premium;
};

const calculateFeaturePremium = (basePremium, features) => {
    if (features.hospitalCash) {
        basePremium += 100;
    }
    if (features.acuteCare) {
        basePremium += 200;
    }
    if (features.safeguard) {
        basePremium *= 1.05;
    }
    if (features.safeguardPlus) {
        basePremium *= 1.10;
    }
    if (features.personalAccidentCover) {
        basePremium += 300;
    }
    if (features.diseaseManagement) {
        basePremium *= 0.80; // 20% discount
    }
    if (features.tieredNetwork) {
        basePremium *= 0.85; // 15% discount
    }
    return basePremium;
};
