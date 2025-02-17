const express = require('express');
const router = express.Router();
const User = require('../models/User');

// Get all users
router.get('/users', async (req, res) => {
    try {
      const users = await User.find({ role: 'user' }, 'email'); // Fetch only users with the role 'user'
      res.json(users);
    } catch (error) {
      console.error('Error fetching users:', error); // Log the error
      res.status(500).json({ message: 'Server error' });
    }
  });

module.exports = router; 