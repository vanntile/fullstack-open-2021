const http = require('http')
const logger = require('pino')()
const app = require('./app')
const config = require('./utils/config')

/****** Starting server ******/

const server = http.createServer(app)

server.listen(config.PORT, () => {
  logger.info(`Server listening on port ${config.PORT} an running in ${config.NODE_ENV} mode`)
})
