const config = require('../config').kafka
const { Kafka, logLevel } = require('kafkajs')
let consumer

const kafka = new Kafka({
  logLevel: logLevel.DEBUG,
  brokers: [`${config.host}:${config.port}`],
  clientId: 'football-score-report',
  sasl: {
    mechanism: config.mechanism,
    username: config.username,
    password: config.password
  }
})

const subscribe = async () => {
  consumer = kafka.consumer({ groupId: 'football-score-report' })
  await consumer.connect()
  await consumer.subscribe({ topic: config.topic, fromBeginning: true })
  await consumer.run({
    eachMessage: async ({ topic, partition, message }) => {
      console.log({
        partition,
        offset: message.offset,
        value: message.value.toString()
      })
    }
  })
}

const stop = async () => {
  await consumer.disconnect()
}

process.on('SIGINT', async () => {
  await consumer.disconnect()
})

process.on('SIGTERM', async () => {
  await consumer.disconnect()
})

module.exports = {
  subscribe, stop
}
