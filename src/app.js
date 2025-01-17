const express = require('express');
const bodyParser = require('body-parser');
const pincodeRoutes = require('./routes/pincodeRoutes');

const app = express();

app.use(bodyParser.json());
app.use('/pincode', pincodeRoutes);

module.exports = app;
