// routes/tasks.js
const express = require('express');
const router = express.Router();
const TaskService = require('../service/AirportService');

// Get all tasks
router.get('/', async (req, res) => {
  try {
    const tasks = await TaskService.getAllTasks();
    res.json(tasks);
  } catch (error) {
    console.error('Error fetching tasks:', error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
});