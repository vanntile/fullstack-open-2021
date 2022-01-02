const config = require('./config')

const logger = require('pino')({
  enabled: config.NODE_ENV !== 'test',
})

module.exports = logger
