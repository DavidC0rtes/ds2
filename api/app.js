/**
 * Este es el archivo madre del backend
 * Acá se inicializa todas las cosas sin las que el backend
 * no podría funcionar
 */
require('express-async-errors')
const typeorm = require('typeorm')
const express = require('express')

const app = express()

const cors = require('cors')
const logger = require('./utils/logger')
const middleware = require('./utils/middleware')
const config = require('./utils/config')

let usersRouter;
let loginRouter;
let categoriesRouter;
let productsRouter;

async function init() {
    try {

        const conn = await typeorm.createConnection('local') 
        console.log('AAAAAAAAAAAAAAAAAAAAA')
        await new Promise(r => setTimeout(r, 5000))
        usersRouter = require('./routes/users')  
        loginRouter = require('./routes/login')

        if (config.ENV === 'production') app.use(express.static('build'))

        app.use(cors())
        app.use(express.json())

        if (config.ENV !== 'test') app.use(middleware.requestLogger)
        
        // Aquí se especifica al servidor que rutas va a escuchar
        app.use('/api/users', usersRouter)
        app.use('/api/login', loginRouter)
        app.use('/api/categories', categoriesRouter)
        app.use('/api/products', productsRouter)
        // Fin especificaciones
        app.use(middleware.unknownEndpoint)
        app.use(middleware.errorHandler)
    } catch (err) {
        logger.error(err)
    }
}

init()

//typeorm.createConnection('local').then((conn) => {
//    usersRouter = require('./routes/users')  
//    loginRouter = require('./routes/login')
//    const categoriesRouter = require('./routes/categories')
//    const productsRouter = require('./routes/products')
//
//    if (config.ENV === 'production') app.use(express.static('build'))
//
//    app.use(cors())
//    app.use(express.json())
//
//    if (config.ENV !== 'test') app.use(middleware.requestLogger)
//    
//    // Aquí se especifica al servidor que rutas va a escuchar
//    app.use('/api/users', usersRouter)
//    app.use('/api/login', loginRouter)
//    app.use('/api/categories', categoriesRouter)
//    app.use('/api/products', productsRouter)
//    // Fin especificaciones
//    app.use(middleware.unknownEndpoint)
//    app.use(middleware.errorHandler)
//
//})
//.catch( err => logger.error(`Error al tratar de conectarse: ${err}`))

module.exports = app
