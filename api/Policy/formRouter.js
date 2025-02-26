const express = require('express');
const Policy = require('./model.js'); // Import your Policy model
const formRouter = express.Router();

// Get all names
formRouter.get('/names', async (req, res) => {
  try {
    const policies = await Policy.find({}, 'insuredDetails.name');
    const names = policies.map(policy => policy.insuredDetails.name);
    res.json(names);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Get all registration numbers
formRouter.get('/registration-numbers', async (req, res) => {
  try {
    const policies = await Policy.find({}, 'vehicleDetails.registrationNo');
    const registrationNumbers = policies.map(policy => policy.vehicleDetails.registrationNo);
    res.json(registrationNumbers);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Get policy details by name or registration number
formRouter.get('/details', async (req, res) => {
  try {
    const { name, registrationNo } = req.query;
    let query = {};

    if (name) {
      query['insuredDetails.name'] = name;
    } else if (registrationNo) {
      query['vehicleDetails.registrationNo'] = registrationNo;
    } else {
      return res.status(400).json({ message: 'Please provide a name or registration number' });
    }

    const policy = await Policy.findOne(query);
    if (!policy) return res.status(404).json({ message: 'Policy not found' });
    res.json(policy);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Count policies by name
formRouter.get('/policy-count-by-name', async (req, res) => {
  try {
    const result = await Policy.aggregate([
      {
        $group: {
          _id: '$insuredDetails.name', // Group by name
          count: { $sum: 1 }, // Count policies for each name
        },
      },
      {
        $project: {
          _id: 0, // Exclude the default _id field
          name: '$_id', // Rename _id to name
          count: 1, // Include the count field
        },
      },
    ]);

    res.json(result);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Calculate average vehicle IDV
formRouter.get('/average-vehicle-idv', async (req, res) => {
  try {
    const result = await Policy.aggregate([
      {
        $group: {
          _id: null, // Group all documents together
          averageIDV: { $avg: '$idvDetails.vehicleIDV' }, // Calculate average
        },
      },
      {
        $project: {
          _id: 0, // Exclude the default _id field
          averageIDV: 1, // Include the averageIDV field
        },
      },
    ]);

    res.json(result[0]); // Return the first (and only) result
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Calculate total IDV
formRouter.get('/total-idv', async (req, res) => {
  try {
    const result = await Policy.aggregate([
      {
        $group: {
          _id: null, // Group all documents together
          totalIDV: { $sum: '$idvDetails.vehicleIDV' }, // Sum up vehicleIDV
        },
      },
      {
        $project: {
          _id: 0, // Exclude the default _id field
          totalIDV: 1, // Include the totalIDV field
        },
      },
    ]);

    res.json(result[0]); // Return the first (and only) result
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Group policies by vehicle make
formRouter.get('/policies-by-make', async (req, res) => {
  try {
    const result = await Policy.aggregate([
      {
        $group: {
          _id: '$vehicleDetails.make', // Group by vehicle make
          count: { $sum: 1 }, // Count policies for each make
        },
      },
      {
        $project: {
          _id: 0, // Exclude the default _id field
          make: '$_id', // Rename _id to make
          count: 1, // Include the count field
        },
      },
    ]);

    res.json(result);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Find policies with high IDV (e.g., IDV > 500,000)
formRouter.get('/high-idv-policies', async (req, res) => {
  try {
    const result = await Policy.aggregate([
      {
        $match: {
          'idvDetails.vehicleIDV': { $gt: 500000 }, // Filter policies with IDV > 500,000
        },
      },
      {
        $project: {
          _id: 0, // Exclude the default _id field
          name: '$insuredDetails.name', // Include the insured's name
          vehicleIDV: '$idvDetails.vehicleIDV', // Include the vehicle IDV
        },
      },
    ]);

    res.json(result);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Find policies with no claims
formRouter.get('/no-claims-policies', async (req, res) => {
  try {
    const result = await Policy.aggregate([
      {
        $match: {
          'previousPolicyDetails.claimsMadeUnderPreviousPolicy': '0', // Filter policies with no claims
        },
      },
      {
        $project: {
          _id: 0, // Exclude the default _id field
          name: '$insuredDetails.name', // Include the insured's name
          claims: '$previousPolicyDetails.claimsMadeUnderPreviousPolicy', // Include claims
        },
      },
    ]);

    res.json(result);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = formRouter;