const express = require('express')
const cors = require('cors')
const helmet = require('helmet')
const morgan = require('morgan')

const peopleService = require('./modules/people/service')
const config = require('./utils/config')
const log = require('./utils/logger')
const middleware = require('./utils/middleware')

require('express-async-errors')

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
morgan.token('data', (req, _) => (req.method === 'POST' ? JSON.stringify(req.body) : ''))
app.use(morgan(':method :url :status :res[content-length] - :response-time ms :data'))
app.use(express.static('build'))

log.info(`Connecting to ${config.PORT}`)

// Routes
app.use('/api', routes)

app.get('/info', async (_req, res) => {
  const count = await peopleService.count()
  res.send(`<p>Phonebook has info for ${count} people.</p><p>${new Date().toString()}</p>`)
})

app.use(middleware.errorHandler)

module.exports = app
