(async function () {
  const kafka = require('./kafka')
  await kafka.subscribe()
}())
