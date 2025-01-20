const express = require('express');
const bodyParser = require('body-parser');
const paymentRoutes = require('./routes/paymentRoutes');

const app = express();

// Middleware
app.use(bodyParser.json());

// Payment routes
app.use('/api/payments', paymentRoutes);

module.exports = app;
