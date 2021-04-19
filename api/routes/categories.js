const categoriesRouter = require('express').Router()
const control = require('../controllers/Control')
const category = require('../entity/Categorias')

//Retornar todas las categorias
categoriesRouter.get('/', async (request, response) => {
    const categories = await control.getAll(category)
    response.json(categories)
})

//Insertar una nueva categoria, nombre NO puede estar vacio
categoriesRouter.post('/', async (request, response) => {
    const body = request.body 

    const newCategory = {
        nombre: body.nombre,
        descripcion: body.descripcion,
        activo: body.activo
    }

    const savedCategory = await control.insert(category, newCategory)

    response.json(savedCategory)


})

module.exports = categoriesRouter