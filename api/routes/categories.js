const categoriesRouter = require('express').Router()
const control = require('../controllers/Control')
const category = require('../entity/Categorias')

//Retornar todas las categorias
categoriesRouter.get('/', async (request, response) => {
    const categories = await control.getAll(category)
    response.json(categories)
})

//Revisar si el nombre de la categoria ya esta en uso
categoriesRouter.head('/:name', async (request, response) => {
    const result = await control.getOneBy(category, 'nombre', request.params.name)

    if (result) {
        return response.status(204).end()
    }else {
        return response.status(404).end()
    }

})

//Insertar una nueva categoria, nombre NO puede estar vacio
categoriesRouter.post('/', async (request, response) => {
    const body = request.body 

    const newCategory = {
        nombre: body.nombre,
        descripcion: body.descripcion,
        activo: body.activo
    }
    if (newCategory.nombre = null){
        return response.status(401).json({ error: 'Se requiere un nombre de categoria'})
    } else {
        const savedCategory = await control.insert(category, newCategory)

        response.json(savedCategory)
    }
    



})

categoriesRouter.put('/:id', async (request, response) => {
    const body = request.body
    const editedCategory = {}

    Object.keys(body).forEach((key) => {
        editedCategory[key] = body[key]
    })
        
    await control.update(category, {id: request.params.id}, editedCategory) 


    response.status(200).end()
})

categoriesRouter.delete('/:id', async (request, response) =>  {
    const body = request.body

    await control.borrar(category,{id: request.params.id})
})

module.exports = categoriesRouter