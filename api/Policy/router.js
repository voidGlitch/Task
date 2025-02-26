const express = require('express');
const Policy = require('./model.js');

const router = express.Router();

// Add a new policy
router.post('/', async (req, res) => {
  try {
    const { registrationNo } = req.body.vehicleDetails;

    // Check if a policy with the same registration number already exists
    const existingPolicy = await Policy.findOne({ 'vehicleDetails.registrationNo': registrationNo });
    if (existingPolicy) {
      return res.status(400).json({ error: 'Policy with this registration number already exists' });
    }

    // Create and save the new policy
    const newPolicy = new Policy(req.body);
    await newPolicy.save();

    // Respond with the created policy
    res.status(201).json(newPolicy);
  } catch (err) {
    // Handle Mongoose validation errors
    if (err.name === 'ValidationError') {
      const errors = Object.values(err.errors).map(e => e.message);
      return res.status(400).json({ error: errors });
    }

    // Handle duplicate key error (from MongoDB unique index)
    if (err.code === 11000) {
      return res.status(400).json({ error: 'Policy with this registration number already exists' });
    }

    // Handle other errors
    res.status(500).json({ error: err.message });
  }
});

// Get all policies
router.get('/', async (req, res) => {
  try {
    const policies = await Policy.find();
    res.json(policies);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Get policy by ID
router.get('/:id', async (req, res) => {
  try {
    const policy = await Policy.findById(req.params.id);
    if (!policy) return res.status(404).json({ message: 'Policy not found' });
    res.json(policy);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Update a policy
router.put('/:id', async (req, res) => {
  try {
    const updatedPolicy = await Policy.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!updatedPolicy) return res.status(404).json({ message: 'Policy not found' });
    res.json(updatedPolicy);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// Delete a policy
router.delete('/:id', async (req, res) => {
  try {
    const deletedPolicy = await Policy.findByIdAndDelete(req.params.id);
    if (!deletedPolicy) return res.status(404).json({ message: 'Policy not found' });
    res.json({ message: 'Policy deleted successfully' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});



module.exports = router;