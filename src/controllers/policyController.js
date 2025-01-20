const db = require('../services/dbService'); // Import your database service that configures mysql2

// Create a new policy
exports.createPolicy = async (req, res) => {
    const { name, description, premium, coverageAmount } = req.body;
    const query = `INSERT INTO policies (name, description, premium, coverageAmount) VALUES (?, ?, ?, ?)`;

    try {
        const [result] = await db.pool.query(query, [name, description, premium, coverageAmount]);
        res.status(201).json({ message: "Policy created successfully", policyId: result.insertId });
    } catch (error) {
        console.error('Error creating policy:', error.message);
        res.status(500).json({ error: 'Failed to create policy' });
    }
};

// Get all policies
exports.getAllPolicies = async (req, res) => {
    const query = "SELECT * FROM policies";

    try {
        const [policies] = await db.pool.query(query);
        res.status(200).json(policies);
    } catch (error) {
        console.error('Error fetching policies:', error.message);
        res.status(500).json({ error: 'Failed to fetch policies' });
    }
};

// Get a single policy by ID
exports.getPolicy = async (req, res) => {
    const { policyId } = req.params;
    const query = "SELECT * FROM policies WHERE id = ?";

    try {
        const [policy] = await db.pool.query(query, [policyId]);
        if (policy.length) {
            res.status(200).json(policy[0]);
        } else {
            res.status(404).json({ message: 'Policy not found' });
        }
    } catch (error) {
        console.error('Error fetching the policy:', error.message);
        res.status(500).json({ error: 'Failed to fetch the policy' });
    }
};

// Update a policy
exports.updatePolicy = async (req, res) => {
    const { policyId } = req.params;
    const { name, description, premium, coverageAmount } = req.body;
    const query = `UPDATE policies SET name = ?, description = ?, premium = ?, coverageAmount = ? WHERE id = ?`;

    try {
        const [result] = await db.pool.query(query, [name, description, premium, coverageAmount, policyId]);
        if (result.affectedRows) {
            res.status(200).json({ message: 'Policy updated successfully' });
        } else {
            res.status(404).json({ message: 'Policy not found' });
        }
    } catch (error) {
        console.error('Error updating the policy:', error.message);
        res.status(500).json({ error: 'Failed to update the policy' });
    }
};

// Delete a policy
exports.deletePolicy = async (req, res) => {
    const { policyId } = req.params;
    const query = "DELETE FROM policies WHERE id = ?";

    try {
        const [result] = await db.pool.query(query, [policyId]);
        if (result.affectedRows) {
            res.status(200).json({ message: 'Policy deleted successfully' });
        } else {
            res.status(404).json({ message: 'Policy not found' });
        }
    } catch (error) {
        console.error('Error deleting the policy:', error.message);
        res.status(500).json({ error: 'Failed to delete the policy' });
    }
};
