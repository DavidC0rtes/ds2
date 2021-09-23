require('dotenv').config
const app = require('./app')
const http = require('http')
const logger = require('./utils/logger')
const config = require('./utils/config')

const server = http.createServer(app)

server.listen(config.PORT, () => {
    logger.info(`API corriendo en el puerto ${config.PORT}`)
})
