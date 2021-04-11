const usersRouter = require('express').Router()
const bcrypt = require('bcrypt')
const control = require('../controllers/Control')
const Usuarios = require('../entity/Usuarios')

// Devuelve todos los usuarios del proyecto cuando se hace un get
usersRouter.get('/', async (request, response) => {
    const users = await control.getAll(Usuarios) 
    response.json(users)
})

/* Creación de usuarios, los campos obligatorios son:
 * email
 * num_documento
 * tipo_documento
 */
usersRouter.post('/', async (request, response) => {
    const body = request.body
    const userInfo = body.info

    if (body.password.length < 3) throw Error("contraseña demasiado corta")

    const passwordHash = await bcrypt.hash(body.password, 10) // Todas las contraseñas se guardan 'encriptadas'

    const newUser =  {
       //Todo 
    }

    //const savedUser = await control.insert(User, newUser)
    //response.json(savedUser)
})

module.exports = usersRouter
