require('dotenv').config() // Necesario para utilizar variables definidas en .env
const app = require('./app')
const http = require('http')

const server = http.createServer(app)

const PORT = process.env.PORT || 3003
server.listen(PORT, () => {
    console.log(`API corriendo en el puerto ${PORT}`)
})
