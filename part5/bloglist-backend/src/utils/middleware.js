const jwt = require('jsonwebtoken')
const config = require('./config')
const log = require('./logger')
const User = require('../models/user')

const unknownEndpoint = (req, res) => {
  res.status(404).send({ error: 'unknown endpoint' })
}

const errorHandler = (err, req, res, _next) => {
  log.error(err)

  const message = err.message ?? 'Something Bad Happened'
  const status = err.statusCode ?? err.status ?? (err.name === 'ValidationError' ? 400 : 500)
  const { errors } = err

  res.status(status).json({ message, errors })
}

const tokenExtractor = (req, _res, next) => {
  const authorization = req.get('authorization')
  const token = authorization && authorization.toLowerCase().startsWith('bearer ') ? authorization.substring(7) : null
  req.token = token

  next()
}

const authGuard = async (req, res, next) => {
  const token = req.token
  if (!token) return res.status(401).json({ message: 'token missing or invalid' })

  const decodedToken = jwt.verify(token, config.SECRET)
  if (!decodedToken.id) return res.status(401).json({ message: 'token missing or invalid' })

  const user = await User.findById(decodedToken.id)

  req.user = user

  next()
}

module.exports = {
  unknownEndpoint,
  errorHandler,
  tokenExtractor,
  authGuard,
}
