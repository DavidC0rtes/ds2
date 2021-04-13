const usersRouter = require('express').Router()
const bcrypt = require('bcrypt')
const control = require('../controllers/Control')
const User = require('../entity/Usuarios')
const InformacionPersonal = require('../entity/InformacionPersonal')

// Devuelve todos los usuarios del proyecto cuando se hace un get
usersRouter.get('/', async (request, response) => {
    const users = await control.getAll(Usuarios) 
    response.json(users)
})

/* Creación de usuarios, se entiende como una solicitud POST a /api/users,
 * el json de la petición debe tener la sgte estructura:
 * "email": "xxx",
 * "password": "zzz",
 * "id_rol": 0,
 * "info": {
 *      "primer_nombre": "aaaa",
 *      etc...
 *  }
 *  
 *  Los campos que pueden ser nulos son: segundo_nombre, direccion, cumpleaños y telefono.
 */
usersRouter.post('/', async (request, response) => {
    const body = request.body

    if (body.password.length < 3) throw Error("contraseña demasiado corta")

    const passwordHash = await bcrypt.hash(body.password, 10) // Todas las contraseñas se guardan hasheadas 

    const  newUser =  {
        email: body.email,
        password: passwordHash,
        id_rol: body.id_rol
    }

    const savedUser = await control.insert(User, newUser)

    if (body.info) {
        let userInfo = body.info
        userInfo.id_user = savedUser.identifiers[0].id

        if (userInfo.birthday) userInfo.birthday = new Date(userInfo.birthday)
        const savedInfo = await control.insert(InformacionPersonal, userInfo)
    }
    response.json(savedUser)
})

// ToDo:
// - Modificación (put), hace parte de otra HU

module.exports = usersRouter
