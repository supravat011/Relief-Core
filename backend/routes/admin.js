const express = require('express');
const db = require('../database');
const { authMiddleware, roleMiddleware } = require('../middleware/auth');

const router = express.Router();

// All admin routes require authentication and admin role
router.use(authMiddleware, roleMiddleware('admin'));

// Get dashboard stats
router.get('/dashboard/stats', (req, res) => {
    try {
        const totalCamps = db.prepare('SELECT COUNT(*) as count FROM camps').get().count;
        const activeCamps = db.prepare('SELECT COUNT(*) as count FROM camps WHERE status = ?').get('Active').count;
        const totalVictims = db.prepare('SELECT COUNT(*) as count FROM victims').get().count;
        const safeVictims = db.prepare('SELECT COUNT(*) as count FROM victims WHERE status = ?').get('Safe').count;
        const criticalResources = db.prepare('SELECT COUNT(*) as count FROM resources WHERE status = ?').get('Critical').count;

        res.json({
            totalCamps,
            activeCamps,
            totalVictims,
            safeVictims,
            criticalResources
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Server error' });
    }
});

// Get all camps
router.get('/camps', (req, res) => {
    try {
        const camps = db.prepare(`
      SELECT c.*, u.full_name as manager_name
      FROM camps c
      LEFT JOIN users u ON c.manager_id = u.id
      ORDER BY c.created_at DESC
    `).all();

        // Get resources for each camp
        const campsWithResources = camps.map(camp => {
            const resources = db.prepare('SELECT * FROM resources WHERE camp_id = ?').all(camp.id);
            return { ...camp, resources };
        });

        res.json(campsWithResources);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Server error' });
    }
});

// Create new camp
router.post('/camps', (req, res) => {
    const { name, location, capacity, manager_id } = req.body;

    try {
        const result = db.prepare(`
      INSERT INTO camps (name, location, capacity, manager_id)
      VALUES (?, ?, ?, ?)
    `).run(name, location, capacity, manager_id || null);

        res.status(201).json({
            message: 'Camp created successfully',
            campId: result.lastInsertRowid
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Server error' });
    }
});

// Get central inventory
router.get('/resources/inventory', (req, res) => {
    try {
        const inventory = db.prepare(`
      SELECT r.*, c.name as camp_name
      FROM resources r
      JOIN camps c ON r.camp_id = c.id
      ORDER BY r.status DESC, r.camp_id
    `).all();

        res.json(inventory);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Server error' });
    }
});

// Get analytics/reports
router.get('/reports/analytics', (req, res) => {
    try {
        const victimsByStatus = db.prepare(`
      SELECT status, COUNT(*) as count
      FROM victims
      GROUP BY status
    `).all();

        const campsByStatus = db.prepare(`
      SELECT status, COUNT(*) as count
      FROM camps
      GROUP BY status
    `).all();

        const resourcesByStatus = db.prepare(`
      SELECT status, COUNT(*) as count
      FROM resources
      GROUP BY status
    `).all();

        res.json({
            victimsByStatus,
            campsByStatus,
            resourcesByStatus
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Server error' });
    }
});

// Get all victims
router.get('/victims', (req, res) => {
    try {
        const victims = db.prepare(`
      SELECT v.*, c.name as camp_name
      FROM victims v
      LEFT JOIN camps c ON v.assigned_camp_id = c.id
      ORDER BY v.registered_at DESC
    `).all();

        res.json(victims);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Server error' });
    }
});

module.exports = router;
