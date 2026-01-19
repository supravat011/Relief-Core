const express = require('express');
const db = require('../database');
const { authMiddleware, roleMiddleware } = require('../middleware/auth');

const router = express.Router();

// All volunteer routes require authentication and volunteer role
router.use(authMiddleware, roleMiddleware('volunteer'));

// Get assigned tasks
router.get('/tasks', (req, res) => {
    try {
        const tasks = db.prepare(`
      SELECT * FROM tasks
      WHERE assigned_to = ?
      ORDER BY 
        CASE priority
          WHEN 'High' THEN 1
          WHEN 'Medium' THEN 2
          WHEN 'Low' THEN 3
        END,
        created_at DESC
    `).all(req.user.id);

        res.json(tasks);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Server error' });
    }
});

// Update task status
router.put('/tasks/:id', (req, res) => {
    const { status } = req.body;

    try {
        const task = db.prepare('SELECT * FROM tasks WHERE id = ? AND assigned_to = ?').get(req.params.id, req.user.id);

        if (!task) {
            return res.status(404).json({ error: 'Task not found or not assigned to you' });
        }

        db.prepare('UPDATE tasks SET status = ? WHERE id = ?').run(status, req.params.id);

        res.json({ message: 'Task updated successfully' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Server error' });
    }
});

// Get volunteer schedule
router.get('/schedule', (req, res) => {
    try {
        const schedule = db.prepare(`
      SELECT * FROM tasks
      WHERE assigned_to = ? AND due_time IS NOT NULL
      ORDER BY due_time ASC
    `).all(req.user.id);

        res.json(schedule);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Server error' });
    }
});

module.exports = router;
