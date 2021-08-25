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

const connName = (config.DBNAME != 'heroku') ? config.DBNAME : null

typeorm.createConnection(connName).then( (conn) => {
    usersRouter = require('./routes/users')  
    loginRouter = require('./routes/login')
    categoriesRouter = require('./routes/categories')
    productsRouter = require('./routes/products')

    if (config.ENV === 'production' || config.ENV === 'cd') app.use(express.static('build'))

    app.use(cors())
    app.use(express.json())
    app.use(middleware.requestLogger)
    
    // Aquí se especifica al servidor que rutas va a escuchar
    app.use('/api/users', usersRouter)
    app.use('/api/login', loginRouter)
    app.use('/api/categories', categoriesRouter)
    app.use('/api/products', productsRouter)
    // Fin especificaciones
    app.use(middleware.unknownEndpoint)
    app.use(middleware.errorHandler)

})
.catch( err => console.log(err))

module.exports = app
