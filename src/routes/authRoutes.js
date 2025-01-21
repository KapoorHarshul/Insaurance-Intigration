const express = require('express');
const router = express.Router();
const authController = require('../controllers/authController');  // Ensure the path to authController is correct

// User registration route
router.post('/register', authController.registerUser);

// User login route
router.post('/login', authController.loginUser);

module.exports = router;
