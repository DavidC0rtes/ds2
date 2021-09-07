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
    logger.error(request)
    response.status(404).send({ error: 'unknown endpoint'})
}

const errorHandler = (error, request, response, next) => {
    if (error.name === 'QueryFailedError' || error.name === 'EntityColumnNotFound') {
        logger.error(error)
        return response.status(400).send({ error: error.message })
    } else if(error.message === 'contraseña demasiado corta') {
        return response.status(400).send(
            { error: 'La contraseña debe contener al menos tres caracteres' }
        )
    
    } else {
        logger.error(error)
    }

    next(error)
}

module.exports = { 
    requestLogger,
    unknownEndpoint,
    errorHandler
}
