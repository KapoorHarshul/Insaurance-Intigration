const express = require('express');
const { performKYC } = require('./services/kycService');
const { generatePartnerToken } = require('./services/tokenService'); // Verify this path is correct
const app = express();

// Middleware to parse JSON bodies
app.use(express.json());

// Middleware to log every request (should be placed before route handlers to log all requests)
app.use((req, res, next) => {
    console.log(`${req.method} ${req.path}`);
    next();
});

// Import route handlers
const authRoutes = require('./routes/authRoutes');
const policyRoutes = require('./routes/policyRoutes');
const quoteRoutes = require('./routes/quoteRoutes');
const paymentRoutes = require('./routes/paymentRoutes');
const kycRoutes = require('./routes/kycRoutes');

// Setup API routes
app.use('/api/auth', authRoutes);
app.use('/api/policies', policyRoutes);
app.use('/api/quotes', quoteRoutes);
app.use('/api/payments', paymentRoutes);
app.use('/api/kyc', kycRoutes);

// Additional route to test token generation
app.get('/test-token', async (req, res) => {
    console.log("Received request to test token generation.");
    try {
        const tokenData = await generatePartnerToken();
        console.log("Token data retrieved successfully.");
        res.json({ success: true, tokenData });
    } catch (error) {
        console.error("Failed to generate or retrieve token:", error);
        res.status(500).json({ success: false, message: error.message });
    }
});

// Export the configured app to be used by server.js
module.exports = app;
