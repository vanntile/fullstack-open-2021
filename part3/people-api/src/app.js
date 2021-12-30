const express = require('express')
const cors = require('cors')
const helmet = require('helmet')
const logger = require('pino')()
const loggerMiddleware = require('pino-http')()

const peopleService = require('./modules/people/service')
const config = require('./utils/config')
const middleware = require('./utils/middleware')

require('express-async-errors')

const routes = require('./routes')
const app = express()

// Middleware
app.use(loggerMiddleware)
app.use(helmet())
app.use(cors({ origin: '*' }))
app.use(express.json())

logger.info(`Connecting to ${config.PORT}`)

// Routes
app.use('/api', routes)

app.get('/info', (_req, res) => {
  res.send(`<p>Phonebook has info for ${peopleService.count()} people.</p><p>${new Date().toString()}</p>`)
})

app.use(middleware.errorHandler)

module.exports = app
