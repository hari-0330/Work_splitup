const express = require('express');
const router = express.Router();
const Task = require('../models/Task');
const User = require('../models/User');

// Create a new task
router.post('/tasks', async (req, res) => {
    const { title, description, assignedTo } = req.body;
    try {
      const user = await User.findById(assignedTo);
      if (!user) return res.status(404).json({ message: 'User not found' });
  
      const task = new Task({ title, description, assignedTo });
      await task.save();
      res.status(201).json(task);
    } catch (error) {
      console.error('Error creating task:', error); // Log the error
      res.status(500).json({ message: 'Server error' });
    }
  });
  

// Get tasks assigned to a specific user
router.get('/tasks/user/:userId', async (req, res) => {
  try {
    const tasks = await Task.find({ assignedTo: req.params.userId }).populate('assignedTo', 'email');
    res.json(tasks);
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
});

// Get all tasks
router.get('/tasks', async (req, res) => {
    try {
      const tasks = await Task.find().populate('assignedTo', 'email');
      res.json(tasks);
    } catch (error) {
      console.error('Error fetching tasks:', error); // Log the error
      res.status(500).json({ message: 'Server error' });
    }
  });

// Update task status
router.put('/tasks/:taskId', async (req, res) => {
  const { status } = req.body;
  try {
    const task = await Task.findById(req.params.taskId);
    if (!task) return res.status(404).json({ message: 'Task not found' });

    task.status = status;
    await task.save();
    res.json(task);
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
});

module.exports = router;