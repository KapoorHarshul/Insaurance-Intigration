const bcrypt = require('bcrypt');
const { getConnection } = require('../services/dbService');

// Create a new user
const createUser = async (req, res) => {
  try {
    const { name, email, password, mobile, pincode } = req.body;

    // Hash the password for security
    const passwordHash = await bcrypt.hash(password, 10);

    const connection = await getConnection();
    await connection.execute(
      'INSERT INTO users (name, email, password_hash, mobile, pincode) VALUES (?, ?, ?, ?, ?)',
      [name, email, passwordHash, mobile, pincode]
    );

    res.status(201).json({ message: 'User created successfully' });
  } catch (error) {
    console.error('Error creating user:', error.message);
    res.status(500).json({ error: 'Failed to create user' });
  }
};

// Read user details by ID
const getUserById = async (req, res) => {
  try {
    const { id } = req.params;

    const connection = await getConnection();
    const [rows] = await connection.execute('SELECT * FROM users WHERE id = ?', [id]);

    if (rows.length === 0) {
      return res.status(404).json({ error: 'User not found' });
    }

    res.status(200).json(rows[0]);
  } catch (error) {
    console.error('Error fetching user details:', error.message);
    res.status(500).json({ error: 'Failed to fetch user details' });
  }
};

// Update user details
const updateUser = async (req, res) => {
  try {
    const { id } = req.params;
    const { name, mobile, pincode } = req.body;

    const connection = await getConnection();
    const [result] = await connection.execute(
      'UPDATE users SET name = ?, mobile = ?, pincode = ? WHERE id = ?',
      [name, mobile, pincode, id]
    );

    if (result.affectedRows === 0) {
      return res.status(404).json({ error: 'User not found' });
    }

    res.status(200).json({ message: 'User updated successfully' });
  } catch (error) {
    console.error('Error updating user details:', error.message);
    res.status(500).json({ error: 'Failed to update user details' });
  }
};

// Delete a user
const deleteUser = async (req, res) => {
  try {
    const { id } = req.params;

    const connection = await getConnection();
    const [result] = await connection.execute('DELETE FROM users WHERE id = ?', [id]);

    if (result.affectedRows === 0) {
      return res.status(404).json({ error: 'User not found' });
    }

    res.status(200).json({ message: 'User deleted successfully' });
  } catch (error) {
    console.error('Error deleting user:', error.message);
    res.status(500).json({ error: 'Failed to delete user' });
  }
};

module.exports = { createUser, getUserById, updateUser, deleteUser };
