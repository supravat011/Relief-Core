const express = require('express');
const db = require('../database');
const { authMiddleware, roleMiddleware } = require('../middleware/auth');

const router = express.Router();

// All manager routes require authentication and manager role
router.use(authMiddleware, roleMiddleware('manager'));

// Get camp details
router.get('/camp/:id', (req, res) => {
    try {
        const camp = db.prepare('SELECT * FROM camps WHERE id = ?').get(req.params.id);
        if (!camp) {
            return res.status(404).json({ error: 'Camp not found' });
        }

        const resources = db.prepare('SELECT * FROM resources WHERE camp_id = ?').all(req.params.id);
        const victims = db.prepare('SELECT * FROM victims WHERE assigned_camp_id = ?').all(req.params.id);

        res.json({ ...camp, resources, victims });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Server error' });
    }
});

// Get victims in camp
router.get('/camp/:id/victims', (req, res) => {
    try {
        const victims = db.prepare('SELECT * FROM victims WHERE assigned_camp_id = ? ORDER BY registered_at DESC').all(req.params.id);
        res.json(victims);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Server error' });
    }
});

// Register new victim
router.post('/victims', (req, res) => {
    const { full_name, age, gender, status, contact_number, assigned_camp_id, needs } = req.body;

    try {
        const result = db.prepare(`
      INSERT INTO victims (full_name, age, gender, status, contact_number, assigned_camp_id, needs)
      VALUES (?, ?, ?, ?, ?, ?, ?)
    `).run(full_name, age, gender, status || 'Displaced', contact_number, assigned_camp_id, JSON.stringify(needs || []));

        // Update camp occupancy
        if (assigned_camp_id) {
            db.prepare('UPDATE camps SET occupancy = occupancy + 1 WHERE id = ?').run(assigned_camp_id);
        }

        res.status(201).json({
            message: 'Victim registered successfully',
            victimId: result.lastInsertRowid
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Server error' });
    }
});

// Update camp resources
router.put('/camp/:id/resources', (req, res) => {
    const { resources } = req.body;

    try {
        const stmt = db.prepare(`
      INSERT OR REPLACE INTO resources (id, camp_id, name, quantity, unit, status)
      VALUES (?, ?, ?, ?, ?, ?)
    `);

        const updateMany = db.transaction((resourceList) => {
            for (const resource of resourceList) {
                stmt.run(resource.id || null, req.params.id, resource.name, resource.quantity, resource.unit, resource.status);
            }
        });

        updateMany(resources);

        res.json({ message: 'Resources updated successfully' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Server error' });
    }
});

// Create resource request
router.post('/requests', (req, res) => {
    const { camp_id, resource_name, quantity_requested } = req.body;

    try {
        const result = db.prepare(`
      INSERT INTO requests (camp_id, resource_name, quantity_requested, requested_by)
      VALUES (?, ?, ?, ?)
    `).run(camp_id, resource_name, quantity_requested, req.user.id);

        res.status(201).json({
            message: 'Request created successfully',
            requestId: result.lastInsertRowid
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Server error' });
    }
});

// Get pending requests
router.get('/requests', (req, res) => {
    try {
        const requests = db.prepare(`
      SELECT r.*, c.name as camp_name
      FROM requests r
      JOIN camps c ON r.camp_id = c.id
      WHERE r.requested_by = ?
      ORDER BY r.created_at DESC
    `).all(req.user.id);

        res.json(requests);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Server error' });
    }
});

module.exports = router;
