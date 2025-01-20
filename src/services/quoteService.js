// Simulate fetching quotes from external APIs or calculating internally
exports.getQuotes = async (coverage, premium, age) => {
    // Simulating a delay to mimic API call latency
    await new Promise(resolve => setTimeout(resolve, 500));

    // Mock data: simulate different quotes from three hypothetical insurance providers
    const quotes = [
        {
            provider: "Provider A",
            premium: adjustPremium(premium, -10),  // Offering a slightly cheaper option
            coverage: adjustCoverage(coverage, 5000),  // Slightly higher coverage
            age: age
        },
        {
            provider: "Provider B",
            premium: adjustPremium(premium, 20),  // More expensive option
            coverage: adjustCoverage(coverage, -10000),  // Slightly lower coverage
            age: age + 2  // Assumes a different risk model considering slightly older age
        },
        {
            provider: "Provider C",
            premium: adjustPremium(premium, 5),  // Slightly more expensive
            coverage: coverage,  // Same coverage
            age: age  // Same age
        }
    ];

    return quotes;
};

// Helper function to adjust premium by a given amount
const adjustPremium = (premium, amount) => {
    return Math.max(premium + amount, 100);  // Ensure premium doesn't go below a reasonable minimum
};

// Helper function to adjust coverage amount
const adjustCoverage = (coverage, amount) => {
    return Math.max(coverage + amount, 50000);  // Ensure coverage doesn't fall below a minimum threshold
};
