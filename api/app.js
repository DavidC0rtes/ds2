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
//const usersRouter = require('./routes/users')

// Esta función se ejecuta inmediatamente.
const foo = (async () => {
    // Se crea la conexión 
    const conn = await typeorm.createConnection()
    // Solo después de crear la conexión se puede importar 
    // el control de las entidades
    const usersRouter = require('./routes/users')
    await conn.close()
})()

//app.use(cors())
//app.use(express.json())
//
//// RUTAS
//app.use('/api/users', usersRouter)
//// FIN RUTAS
//
//app.use(middleware.unknownEndpoint)
//app.use(middleware.errorHandler)
//
//app.use(middleware.requestLogger)

module.exports = app
