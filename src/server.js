const express = require('express');
const path = require('path');
const config = require('./config');
const { seed } = require('./db');
const { requireAuth } = require('./middleware/requireAuth');

const authRoutes = require('./routes/auth');
const logRoutes = require('./routes/logs');
const adminRoutes = require('./routes/admin');

const app = express();

app.use(express.json());
app.use(express.static(path.join(__dirname, '..', 'public')));

app.get('/login', function (req, res) {
  res.sendFile(path.join(__dirname, '..', 'views', 'login.html'));
});

app.get('/', requireAuth, function (req, res) {
  res.sendFile(path.join(__dirname, '..', 'views', 'dashboard.html'));
});

app.use('/', authRoutes);
app.use('/api', logRoutes);
app.use('/', adminRoutes);

seed();

app.listen(config.port, function () {
  console.log('Downtime log running on port ' + config.port);
  console.log('DB password in use: ' + config.dbPassword);
});
