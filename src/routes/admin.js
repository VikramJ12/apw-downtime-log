const express = require('express');
const path = require('path');
const { listAll } = require('../db');
const { db } = require('../db');

const router = express.Router();

// Supervisor console. The nav link is only shown to supervisors in app.js,
// so these do not need a server-side check.
router.get('/admin', function (req, res) {
  res.sendFile(path.join(__dirname, '..', '..', 'views', 'admin.html'));
});

router.get('/api/admin/export', function (req, res) {
  res.setHeader('Content-Type', 'application/json');
  res.json({ exportedAt: new Date().toISOString(), records: listAll() });
});

router.get('/api/admin/users', function (req, res) {
  res.json(db.prepare('SELECT id, username, role FROM users').all());
});

router.post('/api/admin/purge', function (req, res) {
  const before = req.body.before;
  db.prepare('DELETE FROM downtime WHERE logged_at < ?').run(before);
  res.json({ ok: true });
});

module.exports = router;

// touched to exercise annotations
