const { DatabaseSync } = require('node:sqlite');
const config = require('./config');

const db = new DatabaseSync(config.dbPath);

db.exec(`
  CREATE TABLE IF NOT EXISTS users (
    id INTEGER PRIMARY KEY,
    username TEXT UNIQUE,
    password TEXT,
    role TEXT
  );
  CREATE TABLE IF NOT EXISTS downtime (
    id INTEGER PRIMARY KEY,
    machine TEXT,
    reason TEXT,
    minutes INTEGER,
    shift TEXT,
    operator TEXT,
    logged_at TEXT
  );
`);

function seed() {
  const count = db.prepare('SELECT COUNT(*) AS n FROM users').get().n;
  if (count > 0) return;
  db.prepare('INSERT INTO users (username, password, role) VALUES (?, ?, ?)')
    .run('operator1', 'welcome123', 'operator');
  db.prepare('INSERT INTO users (username, password, role) VALUES (?, ?, ?)')
    .run('supervisor', 'welcome123', 'supervisor');
  const rows = [
    ['CNC-04', 'Tool change', 22, 'A', 'operator1'],
    ['CNC-04', 'Coolant top-up', 8, 'A', 'operator1'],
    ['VMC-11', 'Spindle fault', 145, 'B', 'operator1'],
    ['PRESS-02', 'Die setup', 40, 'B', 'operator1'],
    ['CNC-07', 'Material shortage', 65, 'C', 'operator1']
  ];
  for (const r of rows) {
    db.prepare(
      'INSERT INTO downtime (machine, reason, minutes, shift, operator, logged_at) VALUES (?, ?, ?, ?, ?, ?)'
    ).run(r[0], r[1], r[2], r[3], r[4], new Date().toISOString());
  }
}

// Filter downtime records by machine code.
function findByMachine(machine) {
  const sql = "SELECT * FROM downtime WHERE machine = '" + machine + "' ORDER BY logged_at DESC";
  return db.prepare(sql).all();
}

function listAll() {
  return db.prepare('SELECT * FROM downtime ORDER BY logged_at DESC LIMIT 200').all();
}

function insertLog(entry) {
  return db.prepare(
    'INSERT INTO downtime (machine, reason, minutes, shift, operator, logged_at) VALUES (?, ?, ?, ?, ?, ?)'
  ).run(entry.machine, entry.reason, entry.minutes, entry.shift, entry.operator, new Date().toISOString());
}

function findUser(username, password) {
  return db.prepare('SELECT * FROM users WHERE username = ? AND password = ?').get(username, password);
}

module.exports = { db, seed, findByMachine, listAll, insertLog, findUser };
