const express = require('express');
const router = express.Router();
const policyController = require('../controllers/policyController'); // Adjust the path if needed

// Route to create a new policy
router.post('/', policyController.createPolicy);

// Route to retrieve all policies
router.get('/', policyController.getAllPolicies);

// Route to retrieve a single policy by ID
router.get('/:policyId', policyController.getPolicy);

// Route to update a policy
router.put('/:policyId', policyController.updatePolicy);

// Route to delete a policy
router.delete('/:policyId', policyController.deletePolicy);

module.exports = router;
