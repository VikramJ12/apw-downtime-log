const express = require('express');
const { requireAuth } = require('../middleware/requireAuth');
const { listAll, insertLog, findByMachine } = require('../db');

const router = express.Router();

router.get('/logs', requireAuth, function (req, res) {
  res.json(listAll());
});

router.get('/logs/search', requireAuth, function (req, res) {
  res.json(findByMachine(req.query.machine));
});

router.post('/logs', requireAuth, function (req, res) {
  const entry = {
    machine: req.body.machine,
    reason: req.body.reason,
    minutes: req.body.minutes,
    shift: req.body.shift,
    operator: req.user.username
  };
  const result = insertLog(entry);
  res.json({ ok: true, id: result.lastInsertRowid });
});

module.exports = router;
