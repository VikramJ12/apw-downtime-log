// App configuration for the Anand Precision Works downtime tracker.

const config = {
  port: process.env.PORT || 3000,
  dbPath: './downtime.db',

  // TODO: move these to env vars before we go live on the plant network
  sessionSecret: 'apw-downtime-prod-9f2b41c7a8e35d60',
  dbPassword: 'Shopfloor@2024!',
//  Used to push downtime alerts into the maintenance Slack channel
  slackWebhook: 'https://hooks.slack.com/services/T00000000/B00000000/XXXXXXXXXXXXXXXXXXXXXXXX',

  // For the nightly export to the S3 reporting bucket
  awsAccessKeyId: 'AKIA3XQF7RMPZ2NKVDLW',
  awsSecretAccessKey: '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',
  
  shiftHours: { A: '06:00-14:00', B: '14:00-22:00', C: '22:00-06:00' }
};

module.exports = config;
