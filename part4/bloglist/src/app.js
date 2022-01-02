const cors = require('cors')
const express = require('express')
const helmet = require('helmet')

const config = require('./utils/config')
const middleware = require('./utils/middleware')
const log = require('./utils/logger')
require('./utils/db')

// Set up request logging
const pino = require('pino-http')({
  logger: log,
})

require('express-async-errors')

// Declare app
const routes = require('./routes')
const app = express()

// Middleware
app.use(
  helmet.contentSecurityPolicy({
    useDefaults: true,
    directives: {
      // eslint-disable-next-line quotes
      'script-src': ["'self'", "'unsafe-inline'"],
    },
  }),
)
app.use(cors())
app.use(express.json())
app.use(pino)
app.use(middleware.tokenExtractor)

log.info(`Connecting to ${config.PORT}`)

// Routes
app.use('/api', routes)

// Error catching middleware
app.use(middleware.unknownEndpoint)
app.use(middleware.errorHandler)

module.exports = app
