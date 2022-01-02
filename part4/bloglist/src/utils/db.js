const mongoose = require('mongoose')
const config = require('../utils/config')
const log = require('../utils/logger')

const url = config.MONGODB_URI

log.info(`Connecting to MongoDB`)

mongoose
  .connect(url)
  .then((_result) => {
    log.info('Connected to MongoDB')
  })
  .catch((error) => {
    log.info(`Error connecting to MongoDB: ${error.message}`)
  })
