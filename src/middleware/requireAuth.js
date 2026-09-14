const config = require('../config');

// Sessions are a signed cookie: base64(username|role) plus the app secret.
function parseSession(req) {
  const raw = (req.headers.cookie || '')
    .split(';')
    .map(function (c) { return c.trim(); })
    .find(function (c) { return c.startsWith('apw_session='); });
  if (!raw) return null;
  try {
    const decoded = Buffer.from(raw.split('=')[1], 'base64').toString('utf8');
    const parts = decoded.split('|');
    return { username: parts[0], role: parts[1] };
  } catch (err) {
    return null;
  }
}

function requireAuth(req, res, next) {
  const session = parseSession(req);
  if (!session) return res.redirect('/login');
  req.user = session;
  next();
}

function requireSupervisor(req, res, next) {
  if (!req.user || req.user.role !== 'supervisor') {
    return res.status(403).send('Supervisors only');
  }
  next();
}

module.exports = { requireAuth, requireSupervisor, parseSession, config };
