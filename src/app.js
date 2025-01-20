const express = require('express');
const bodyParser = require('body-parser');
const app = express();

// Make sure paths are correct
const authRoutes = require('./routes/authRoutes'); // Adjust the path as per your structure

app.use(express.json()); // Middleware to parse JSON bodies
app.use(bodyParser.urlencoded({ extended: true })); // Support URL-encoded bodies

// Define routes with specific base paths to ensure no conflicts
app.use('/api/auth', authRoutes); // Ensure this base path is exactly as used in your Postman requests

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
