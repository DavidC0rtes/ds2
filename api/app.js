/**
 * Este es el archivo madre del backend
 * Acá se inicializa todas las cosas sin las que el backend
 * no podría funcionar
 */
require('express-async-errors')
const path = require('path')
const typeorm = require('typeorm')
const express = require('express')

const app = express()

const cors = require('cors')
const logger = require('./utils/logger')
const middleware = require('./utils/middleware')
const config = require('./utils/config')

let usersRouter = null

//console.log('A')
typeorm.createConnection(config.DBNAME).then(() => {
    //console.log('B')
    const usersRouter = require('./routes/users')  
    const loginRouter = require('./routes/login')
    const categoriesRouter = require('./routes/categories')
    const productsRouter = require('./routes/products')
    const sedesRouter = require('./routes/sedes')
    const facturasRouter = require('./routes/facturas')
    const dctoRouter = require('./routes/descuentos')

    if (config.ENV === 'production') {
        app.use(express.static(path.join(__dirname, 'build')))
        app.get('/', function (req, res) {
            try {
                res.sendFile(path.join(__dirname, 'build', 'index.html'))
            } catch (err) {
                return res.status(500).send(err)
            }
        })
    }

    app.use(cors())
    app.use(express.json())
    app.use(middleware.requestLogger)
    
    // Aquí se especifica al servidor que rutas va a escuchar
    app.use('/api/users', usersRouter)
    app.use('/api/login', loginRouter)
    app.use('/api/categories', categoriesRouter)
    app.use('/api/products', productsRouter)
    app.use('/api/sedes', sedesRouter)
    app.use('/api/facturas', facturasRouter)
    app.use('/api/descuentos', dctoRouter)
    // Fin especificaciones
    app.use(middleware.unknownEndpoint)
    app.use(middleware.errorHandler)

})
.catch( err => logger.error(`Error al tratar de conectarse: ${err}`))

module.exports = app
