import logger from './logger'
import * as express from 'express'

export const errorHandler = (err: any, _req: express.Request, res: express.Response, _next: express.NextFunction) => {
  logger.error(err)

  const message = err.message ?? 'Something Bad Happened'
  const status = err.statusCode ?? err.status ?? (err.name === 'ValidationError' ? 400 : 500)
  const { errors } = err

  res.status(status).json({ message, errors })
}

export default { errorHandler }
