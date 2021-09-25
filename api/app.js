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
const config = require('./utils/config')

let usersRouter = null

typeorm.createConnection(config.DBNAME).then( () => {
    const usersRouter = require('./routes/users')  
    const loginRouter = require('./routes/login')
    const categoriesRouter = require('./routes/categories')
    const productsRouter = require('./routes/products')
    const sedesRouter = require('./routes/sedes')

    if (config.ENV === 'production') app.use(express.static('build'))

    app.use(cors())
    app.use(express.json())
    app.use(middleware.requestLogger)
    
    // Aquí se especifica al servidor que rutas va a escuchar
    app.use('/api/users', usersRouter)
    app.use('/api/login', loginRouter)
    app.use('/api/categories', categoriesRouter)
    app.use('/api/products', productsRouter)
    app.use('/api/sedes', sedesRouter)
    // Fin especificaciones
    app.use(middleware.unknownEndpoint)
    app.use(middleware.errorHandler)

})
.catch( err => console.log(err))

module.exports = app
