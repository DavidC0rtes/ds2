require('dotenv').config()

const PORT = process.env.PORT


// Determina a que base de datos conectarse dependiento del ambiente
// con que se ejecute node.
//
// Si quieren utilizar una base de datos en su local este es el formato de la url:
// postgres://username:password@host/database
//
// por lo general host sería localhost
//
// @see package.json 
const DBNAME = process.env.NODE_ENV === 'test'
    ? "local"
    : "local" 

module.exports = {
    PORT,
    DBNAME
}
