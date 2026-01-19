const express = require('express');
const db = require('../database');
const { authMiddleware, roleMiddleware } = require('../middleware/auth');

const router = express.Router();

// All victim routes require authentication and victim role
router.use(authMiddleware, roleMiddleware('victim'));

// Get victim status
router.get('/status/:id', (req, res) => {
    try {
        const victim = db.prepare(`
      SELECT v.*, c.name as camp_name, c.location as camp_location
      FROM victims v
      LEFT JOIN camps c ON v.assigned_camp_id = c.id
      WHERE v.id = ?
    `).get(req.params.id);

        if (!victim) {
            return res.status(404).json({ error: 'Victim not found' });
        }

        res.json(victim);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Server error' });
    }
});

// Submit aid request
router.post('/aid-request', (req, res) => {
    const { victim_id, aid_type, description } = req.body;

    try {
        // Get victim's camp
        const victim = db.prepare('SELECT assigned_camp_id FROM victims WHERE id = ?').get(victim_id);

        if (!victim || !victim.assigned_camp_id) {
            return res.status(400).json({ error: 'Victim not assigned to a camp' });
        }

        // Create request
        const result = db.prepare(`
      INSERT INTO requests (camp_id, resource_name, quantity_requested, requested_by, status)
      VALUES (?, ?, ?, ?, ?)
    `).run(victim.assigned_camp_id, aid_type, 1, req.user.id, 'Pending');

        res.status(201).json({
            message: 'Aid request submitted successfully',
            requestId: result.lastInsertRowid
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Server error' });
    }
});

// Find nearby camps
router.get('/camps/nearby', (req, res) => {
    try {
        // For now, return all active camps
        // In production, this would use geolocation
        const camps = db.prepare(`
      SELECT id, name, location, capacity, occupancy, status
      FROM camps
      WHERE status = 'Active'
      ORDER BY (capacity - occupancy) DESC
    `).all();

        res.json(camps);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Server error' });
    }
});

module.exports = router;
