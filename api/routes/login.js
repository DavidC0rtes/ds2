/* Este endpoint se encarga del Log In de usuarios.
 * Cada usuario autenticado recibe un token el cual es un hash
 * que se calcula con su contraseña y una cadena 'aleatoria'.
 * Este token se utiliza para asegurarse que el usuario es quien dice 
 * ser en las demás partes del proyecto.
*/
const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt')
const User = require('../entity/Usuarios')
const control = require('../controllers/Control')
const loginRouter = require('express').Router()

/* Un login se entiende como una solicitud POST a api/login.
 * En el cuerpo de la solicitud debe estar el correo y la contraseña del usuario.
 *
 */
loginRouter.post('/', async (request, response) => {
    const body = request.body
    
    // Se trae al usuario con el email proporcionado desde la BD
    const result = await control.getBy(User, 'email', body.email)
    
    // getBy devuelve un arreglo, el primer elemento es el objeto del usuario consultado
    // primero se chequea que el arreglo no esté vacío antes de hacer la asignación
    // para evitar un indexoutofbounds.
    const user = result ? result[0] : false

    if (!user) return response.status(401).json({ error: 'correo electrónico y/o contraseña inválidos'})
    // Se revisa si el usuario está activo. Separado del if anterior para evitar un TypeError
    if (!user.activo) return response.status(401).json({ error: 'usuario inactivo'})
    
    // Se comprueba si el hash en la bd es el mismo que el hash
    // calculado a partir de la contraseña ingresada.
    const passwordCorrect = user === null
    ? false
    : await bcrypt.compare(body.password, user.password)

    if (!(user && passwordCorrect)) {
        return response.status(401).json({
            error: 'correo electrónico y/o contraseña inválidos'
        })
    }

    const userForToken = {
        email: user.email,
        id: user.id
    }

    const token = jwt.sign(userForToken, process.env.SECRET)

    response
        .status(200)
        .send({ token, email: user.email, rol: user.id_rol })
})

module.exports = loginRouter
