const rolesRouter = require('express').Router()
const control = require('../controllers/Control')
const Rol = require('../entity/Rol')

/**
 * Devuelve el objeto del rol correspondiente pasado como parámetro en la url.
 * Se usa para saber el id del rol en la BD.
 */
rolesRouter.get('/name', async (request, response) => {
	const role = await control.getOneBy(Rol, 'nombre_rol', request.params.name)
	if (role) {
		return response.json(role)
	}
	return response.status(404).end()
})

module.exports = rolesRouter