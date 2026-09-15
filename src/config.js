// App configuration for the Anand Precision Works downtime tracker.

const config = {
  port: process.env.PORT || 3000,
  dbPath: './downtime.db',

  // TODO: move these to env vars before we go live on the plant network
  sessionSecret: 'apw-downtime-prod-9f2b41c7a8e35d60',
  dbPassword: 'Shopfloor@2024!',

  
  shiftHours: { A: '06:00-14:00', B: '14:00-22:00', C: '22:00-06:00' }
};

module.exports = config;
