const express = require('express');
const bodyParser = require('body-parser');
const authRoutes = require('./routes/authRoutes');  // Ensure this is the correct path

const app = express();
const policyRoutes = require('./routes/policyRoutes'); // Ensure this path is correct

app.use(express.json()); // Middleware to parse JSON bodies
app.use('/api', policyRoutes); // Setup API routes

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
app.use((req, res, next) => {
  console.log(`${req.method} ${req.path}`);
  next();
});