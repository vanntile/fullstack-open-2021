const log = require('./logger')

const unknownEndpoint = (request, response) => {
  response.status(404).send({ error: 'unknown endpoint' })
}

const errorHandler = (err, req, res, _next) => {
  log.error(err)

  const message = err.message ?? 'Something Bad Happened'
  const status = err.statusCode ?? err.status ?? err.name === 'ValidationError' ? 400 : 500
  const { errors } = err

  res.status(status).json({ message, errors })
}

module.exports = {
  unknownEndpoint,
  errorHandler,
}
