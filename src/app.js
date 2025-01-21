const express = require('express');
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
const paymentRoutes = require('./routes/paymentRoutes');  // Adjust the path as necessary


// Setup API routes
app.use('/api/auth', authRoutes);
app.use('/api/policies', policyRoutes);
app.use('/api/quotes', quoteRoutes);
app.use('/api/payments', paymentRoutes);  // Using payment routes under '/api/payments'


// Export the configured app to be used by server.js or for testing purposes
module.exports = app;
