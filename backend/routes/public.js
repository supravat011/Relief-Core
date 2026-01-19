const express = require('express');
const db = require('../database');

const router = express.Router();

// Get all active camps (public)
router.get('/camps', (req, res) => {
    try {
        const camps = db.prepare(`
      SELECT id, name, location, capacity, occupancy, status
      FROM camps
      WHERE status IN ('Active', 'Full')
      ORDER BY name
    `).all();

        res.json(camps);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Server error' });
    }
});

// Search for victims (public)
router.get('/search/victims', (req, res) => {
    const { query } = req.query;

    if (!query) {
        return res.status(400).json({ error: 'Search query required' });
    }

    try {
        const victims = db.prepare(`
      SELECT v.id, v.full_name, v.age, v.gender, v.status, c.name as camp_name, v.registered_at
      FROM victims v
      LEFT JOIN camps c ON v.assigned_camp_id = c.id
      WHERE v.full_name LIKE ? OR v.id = ?
      LIMIT 50
    `).all(`%${query}%`, query);

        res.json(victims);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Server error' });
    }
});

// Search camps by location (public)
router.get('/search/camps', (req, res) => {
    const { location } = req.query;

    if (!location) {
        return res.status(400).json({ error: 'Location query required' });
    }

    try {
        const camps = db.prepare(`
      SELECT id, name, location, capacity, occupancy, status
      FROM camps
      WHERE location LIKE ? AND status = 'Active'
      ORDER BY (capacity - occupancy) DESC
    `).all(`%${location}%`);

        res.json(camps);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Server error' });
    }
});

module.exports = router;
