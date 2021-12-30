const errorHandler = (err, req, res, next) => {
  req.log.error(err)

  let status = 500
  let message = 'Something Bad Happened'
  if (err.httpStatus) {
    status = err.httpStatus
    message = err.message
  }

  res.status(status).json({ message })
}

module.exports = {
  errorHandler,
}
