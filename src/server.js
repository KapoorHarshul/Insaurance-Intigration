const app = require('./app'); // Import the configured Express application
const PORT = process.env.PORT || 3000;

// Start the server on the specified port
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
