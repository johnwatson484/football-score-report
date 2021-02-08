const config = {
  env: process.env.NODE_ENV,
  kafka: {
    host: process.env.KAFKA_HOST || 'kafka',
    port: process.env.KAFKA_PORT || 9093,
    username: process.env.KAFKA_CLIENT_USER,
    password: process.env.KAFKA_CLIENT_PASSWORD,
    mechanism: process.env.KAFKA_MECHANISM || 'scram-sha-512',
    clientId: process.env.KAFKA_CLIENT_ID || 'football-score-report',
    topic: process.env.KAFKA_TOPIC || 'results'
  }
}

module.exports = config
