const typeorm = require('typeorm')

const initializeConnection = async () => {
    const connection = await typeorm.createConnection()
    console.log('Conectado satisfactoriamente')
}
initializeConnection()
module.exports = initializeConnection
