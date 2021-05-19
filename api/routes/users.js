const typeorm = require('typeorm')
const usersRouter = require('express').Router()
const bcrypt = require('bcrypt')
const control = require('../controllers/Control')
const User = require('../entity/Usuarios')
const InformacionPersonal = require('../entity/InformacionPersonal')

// Devuelve todos los usuarios del proyecto cuando se hace un get
usersRouter.get('/', async (request, response) => {
    const users = await control.getAll(User) 
    response.json(users)
})

// Determina si el usuario con correo email existe. No devuelve al usuario 
usersRouter.head('/:email', async (request, response) => {
    const result = await control.getBy(User, 'email', request.params.email)

    if (result) {
        return response.status(204).end()
    }

    return response.status(404).end()
})

/*
 * Devuelve el usuario con email especificado. A diferencia del anterior, este
 * responde a una solicitud GET
 */
usersRouter.get('/:email', async (request, response) => {
    const result = await control.getBy(User, 'email', request.params.email)

    if (result) {
        response.json(result)
    } else {
        return response.status(404).end()
    }
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
        // Actualizar tabla usuario con el id de información personal
        const updateResult = await control
            .update(User, userInfo.id_user , {id_info: savedInfo.identifiers[0].id})
    }

    response.json(savedUser)
})

/**
 * Responde a peticiones PUT. Se utilizan para actualizar la información
 * de usuarios. 
 *
 * El objeto que recibe contiene los campos a actualizar.
 * Como los usuarios tocan dos tablas, debe revisarse que tablas
 * deben actualizarse en base a los campos del objeto de la petición.
 */
usersRouter.put('/:id', async (request, response) => {
    const body = request.body
    const user = {}
    const userInfo = {}
    
    if (body.password && body.password.length > 3) {
        user.password = await bcrypt.hash(body.password, 10)
        delete body.password
        
    } else {
        throw Error('contraseña demasiado corta')
    }

    Object.keys(body).forEach((key) => {
        if (key === 'birthday') {
            userInfo[key] = new Date(body[key])
        } else if (key === 'email') {
            user[key] = body[key]
        } else {
            userInfo[key] = body[key]
        }
    })

    let updatedUser
    if (Object.keys(user).length > 0) {
        updatedUser = await control.update(User, {id: request.params.id}, user)
    }

    if (Object.keys(userInfo).length > 0) {
        await control.update(InformacionPersonal, {id_user: request.params.id}, userInfo) 
    }

    response.status(200).end()
})


module.exports = usersRouter
