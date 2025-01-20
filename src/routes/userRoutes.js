const express = require('express');
const {
  createUser,
  getUserById,
  updateUser,
  deleteUser,
} = require('../controllers/userController');

const router = express.Router();

// Create a new user
router.post('/users', createUser);

// Get user details by ID
router.get('/users/:id', getUserById);

// Update user details by ID
router.put('/users/:id', updateUser);

// Delete a user by ID
router.delete('/users/:id', deleteUser);

module.exports = router;
