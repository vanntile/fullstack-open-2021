const http = require('http')
const app = require('./app')
const config = require('./utils/config')
const log = require('./utils/logger')

/****** Starting server ******/

const server = http.createServer(app)

server.listen(config.PORT, () => {
  log.info(`Server listening on port ${config.PORT} an running in ${config.NODE_ENV} mode`)
})
