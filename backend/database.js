const Database = require('better-sqlite3');
const path = require('path');

const db = new Database(path.join(__dirname, 'reliefcore.db'));

// Enable foreign keys
db.pragma('foreign_keys = ON');

// Initialize database schema
function initializeDatabase() {
    // Users table
    db.exec(`
    CREATE TABLE IF NOT EXISTS users (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      email TEXT UNIQUE NOT NULL,
      password_hash TEXT NOT NULL,
      role TEXT NOT NULL CHECK(role IN ('admin', 'manager', 'volunteer', 'victim')),
      full_name TEXT NOT NULL,
      phone TEXT,
      created_at DATETIME DEFAULT CURRENT_TIMESTAMP
    )
  `);

    // Camps table
    db.exec(`
    CREATE TABLE IF NOT EXISTS camps (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      name TEXT NOT NULL,
      location TEXT NOT NULL,
      capacity INTEGER NOT NULL,
      occupancy INTEGER DEFAULT 0,
      status TEXT DEFAULT 'Active' CHECK(status IN ('Active', 'Full', 'Closed')),
      manager_id INTEGER,
      created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
      FOREIGN KEY (manager_id) REFERENCES users(id)
    )
  `);

    // Victims table
    db.exec(`
    CREATE TABLE IF NOT EXISTS victims (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      full_name TEXT NOT NULL,
      age INTEGER,
      gender TEXT,
      status TEXT DEFAULT 'Displaced' CHECK(status IN ('Safe', 'Injured', 'Missing', 'Deceased', 'Displaced')),
      contact_number TEXT,
      assigned_camp_id INTEGER,
      needs TEXT,
      registered_at DATETIME DEFAULT CURRENT_TIMESTAMP,
      FOREIGN KEY (assigned_camp_id) REFERENCES camps(id)
    )
  `);

    // Resources table
    db.exec(`
    CREATE TABLE IF NOT EXISTS resources (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      camp_id INTEGER NOT NULL,
      name TEXT NOT NULL,
      quantity INTEGER NOT NULL,
      unit TEXT NOT NULL,
      status TEXT DEFAULT 'Good' CHECK(status IN ('Good', 'Low', 'Critical')),
      updated_at DATETIME DEFAULT CURRENT_TIMESTAMP,
      FOREIGN KEY (camp_id) REFERENCES camps(id) ON DELETE CASCADE
    )
  `);

    // Requests table
    db.exec(`
    CREATE TABLE IF NOT EXISTS requests (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      camp_id INTEGER NOT NULL,
      resource_name TEXT NOT NULL,
      quantity_requested INTEGER NOT NULL,
      status TEXT DEFAULT 'Pending' CHECK(status IN ('Pending', 'Approved', 'In Transit', 'Delivered')),
      requested_by INTEGER NOT NULL,
      created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
      FOREIGN KEY (camp_id) REFERENCES camps(id),
      FOREIGN KEY (requested_by) REFERENCES users(id)
    )
  `);

    // Tasks table
    db.exec(`
    CREATE TABLE IF NOT EXISTS tasks (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      title TEXT NOT NULL,
      description TEXT,
      location TEXT,
      priority TEXT DEFAULT 'Medium' CHECK(priority IN ('High', 'Medium', 'Low')),
      status TEXT DEFAULT 'Pending' CHECK(status IN ('Pending', 'In Progress', 'Completed')),
      assigned_to INTEGER,
      due_time DATETIME,
      created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
      FOREIGN KEY (assigned_to) REFERENCES users(id)
    )
  `);

    console.log('✅ Database schema initialized');
}

// Seed initial data
function seedDatabase() {
    const bcrypt = require('bcryptjs');

    // Check if admin exists
    const adminExists = db.prepare('SELECT id FROM users WHERE email = ?').get('admin@reliefcore.org');

    if (!adminExists) {
        const hashedPassword = bcrypt.hashSync('admin123', 10);

        // Create admin user
        db.prepare(`
      INSERT INTO users (email, password_hash, role, full_name, phone)
      VALUES (?, ?, ?, ?, ?)
    `).run('admin@reliefcore.org', hashedPassword, 'admin', 'System Administrator', '+1-555-0001');

        // Create manager user
        const managerHash = bcrypt.hashSync('manager123', 10);
        db.prepare(`
      INSERT INTO users (email, password_hash, role, full_name, phone)
      VALUES (?, ?, ?, ?, ?)
    `).run('manager@reliefcore.org', managerHash, 'manager', 'Sarah Connor', '+1-555-0002');

        // Create volunteer user
        const volunteerHash = bcrypt.hashSync('volunteer123', 10);
        db.prepare(`
      INSERT INTO users (email, password_hash, role, full_name, phone)
      VALUES (?, ?, ?, ?, ?)
    `).run('volunteer@reliefcore.org', volunteerHash, 'volunteer', 'John Volunteer', '+1-555-0003');

        // Create victim user
        const victimHash = bcrypt.hashSync('victim123', 10);
        db.prepare(`
      INSERT INTO users (email, password_hash, role, full_name, phone)
      VALUES (?, ?, ?, ?, ?)
    `).run('victim@reliefcore.org', victimHash, 'victim', 'Jane Doe', '+1-555-0004');

        // Create sample camps
        const camp1 = db.prepare(`
      INSERT INTO camps (name, location, capacity, occupancy, status, manager_id)
      VALUES (?, ?, ?, ?, ?, ?)
    `).run('Central High School Shelter', 'District 1, Downtown', 500, 420, 'Active', 2);

        const camp2 = db.prepare(`
      INSERT INTO camps (name, location, capacity, occupancy, status, manager_id)
      VALUES (?, ?, ?, ?, ?, ?)
    `).run('Stadium Triage Center', 'District 2, East', 1000, 950, 'Full', 2);

        // Add resources to camps
        db.prepare(`
      INSERT INTO resources (camp_id, name, quantity, unit, status)
      VALUES (?, ?, ?, ?, ?)
    `).run(camp1.lastInsertRowid, 'Water (L)', 150, 'L', 'Critical');

        db.prepare(`
      INSERT INTO resources (camp_id, name, quantity, unit, status)
      VALUES (?, ?, ?, ?, ?)
    `).run(camp1.lastInsertRowid, 'Food Packs', 300, 'Pack', 'Good');

        db.prepare(`
      INSERT INTO resources (camp_id, name, quantity, unit, status)
      VALUES (?, ?, ?, ?, ?)
    `).run(camp2.lastInsertRowid, 'IV Fluids', 10, 'Bag', 'Critical');

        // Add sample victims
        for (let i = 0; i < 10; i++) {
            db.prepare(`
        INSERT INTO victims (full_name, age, gender, status, contact_number, assigned_camp_id, needs)
        VALUES (?, ?, ?, ?, ?, ?, ?)
      `).run(
                `Victim ${i}`,
                20 + i,
                i % 2 === 0 ? 'Male' : 'Female',
                'Safe',
                `555-010${i}`,
                i < 5 ? camp1.lastInsertRowid : camp2.lastInsertRowid,
                JSON.stringify(['Water', 'Shelter'])
            );
        }

        // Add sample tasks
        db.prepare(`
      INSERT INTO tasks (title, description, location, priority, status, assigned_to)
      VALUES (?, ?, ?, ?, ?, ?)
    `).run(
            'Distribute Food Packs at Zone A',
            'Hand out food packages to families',
            'Central Camp',
            'High',
            'Pending',
            3
        );

        console.log('✅ Database seeded with initial data');
    }
}

// Initialize on module load
initializeDatabase();
seedDatabase();

module.exports = db;
