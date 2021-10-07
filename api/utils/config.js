require('dotenv').config()

const PORT = process.env.PORT;


// Determina a que base de datos conectarse dependiento del ambiente
// con que se ejecute node.
//
// Si quieren utilizar una base de datos en su local este es el formato de la url:
// postgres://username:password@host/database
//
// por lo general host sería localhost
//
// @see package.json 

const ConnectionNameHash = {
    'test': 'local', // npm test
    'production': 'default', // npm start 
    'development': 'local', // npm run dev, si quieren usar la db en heroku, cambiar local por produccion
}
const DBNAME = ConnectionNameHash[process.env.NODE_ENV]

const ENV = process.env.NODE_ENV
module.exports = {
    PORT,
    DBNAME,
    ENV
}
