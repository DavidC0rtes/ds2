const typeorm = require('typeorm')

const initializeConnection = async () => {
    const connection = await typeorm.createConnection()
    console.log(typeorm.getConnection())
}
//initializeConnection
module.exports = initializeConnection
