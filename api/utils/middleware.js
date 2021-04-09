/*
 * Middleware de la aplicación, más adelante crecerá en tamaño
 * se encarga de hacer logs de las peticiones a la api y mostrar
 * en pantalla los errores, si suceden
 */
const logger = require('./logger')

const requestLogger = (request, response, next) => {
    logger.info('Method:', request.method)
    logger.info('Path:', request.path)
    logger.info('Body:', request.body)
    logger.info('----------')
    next()
}

const unknownEndpoint = (request, response) => {
    response.status(404).send({ error: 'unknown endpoint'})
}

const errorHandler = (error, request, response, next) => {
    logger.error(error.message)
}

module.exports = { 
    requestLogger,
    unknownEndpoint,
    errorHandler
}
