/**
 * Este es el archivo madre del backend
 * Acá se inicializa todas las cosas sin las que el backend
 * no podría funcionar
 */
const typeorm = require('typeorm')
const express = require('express')
require('express-async-errors')
const app = express()
const cors = require('cors')
const logger = require('./utils/logger')
const middleware = require('./utils/middleware')

// Esta función se ejecuta inmediatamente.
const foo = (async () => {
    // Se crea la conexión 
    const conn = await typeorm.createConnection()

    // Importan las rutas
    const usersRouter = require('./routes/users')

    app.use(cors())
    app.use(express.json())
    app.use(middleware.requestLogger)

    // Aquí se especifica al servidor que rutas va a escuchar
    app.use('/api/users', usersRouter)
    // Fin especificaciones
    
    app.use(middleware.unknownEndpoint)
    app.use(middleware.errorHandler)
})()


module.exports = app
