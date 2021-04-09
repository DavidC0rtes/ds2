require('dotenv').config() // Necesario para utilizar variables definidas en .env
const app = require('./app')
const http = require('http')
const logger = require('./utils/logger')

const server = http.createServer(app)

const PORT = process.env.PORT || 3003
server.listen(PORT, () => {
    logger.info(`API corriendo en el puerto ${PORT}`)
})
