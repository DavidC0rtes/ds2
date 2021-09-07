const productsRouter = require('express').Router()
const control = require('../controllers/Control')
const product = require('../entity/Productos')
const category = require('../entity/Categorias')



//Confirmar que existe la categoria asignada al producto
// Determina si el usuario con correo email existe. No devuelve al usuario 
productsRouter.head('/:categoria', async (request, response) => {
    const result = await control.getBy(product, 'categoria', request.params.categoria)

    if (result) {
        return response.status(204).end()
    }

    return response.status(404).end()
})

/*Creación de un nuevo producto
* La estructura es:
* "nombre": "ejemplo",
* "descripcion": "aaa"
* "cantidad": "2"
* "iva": "1.19"
* "precio": "4000"
* "id_categoria": "1"
* Solo descripción, cantidad y iva pueden dejarse vacíos.
* Note que debe existir una categoría antes de agregar un producto 
*/

//Retornar producto de una categoria dada

productsRouter.get('/:categoria', async (request, response) => {
    const categoryproducts = await control.getBy(product, 'categoria', request.params.categoria)
    response.json(categoryproducts)
})
productsRouter.get('/', async (request, response) => {
    const products = await control.getAll(product)
    response.json(products)
})

productsRouter.post('/', async (request, response) => {
    const body = request.body     
    const newProduct = {
        nombre: body.nombre,
        descripcion: body.descripcion,
        cantidad: body.cantidad,
        iva: body.iva,
        precio: body.precio,
        categoria: body.categoria,
        imagen: body.imagen
    } 
    const insertedProduct = await control.insert(product, newProduct)
    
    response.json(insertedProduct)
})

productsRouter.put('/:id', async (request, response) => {
    const body = request.body
    const editedProduct = {}

    Object.keys(body).forEach((key) => {
        editedProduct[key] = body[key]
    })
        
    await control.update(product, {id: request.params.id}, editedProduct) 


    response.status(200).end()
})

productsRouter.delete('/:id', async (request, response) =>  {
    const body = request.body

    await control.borrar(product,{id: request.params.id})
})

module.exports = productsRouter
