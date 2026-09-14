const express = require('express');
const { findUser } = require('../db');

const router = express.Router();

router.post('/login', function (req, res) {
  const { username, password } = req.body;
  const user = findUser(username, password);
  if (!user) {
    return res.status(401).json({ error: 'Wrong username or password' });
  }
  const token = Buffer.from(user.username + '|' + user.role).toString('base64');
  res.setHeader('Set-Cookie', 'apw_session=' + token + '; Path=/');
  res.json({ ok: true, role: user.role });
});

router.post('/logout', function (req, res) {
  res.setHeader('Set-Cookie', 'apw_session=; Path=/; Max-Age=0');
  res.json({ ok: true });
});

module.exports = router;
