const productsRouter = require('express').Router()
const control = require('../controllers/Control')
const product = require('../entity/Productos')
const category = require('../entity/Categorias')

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

productsRouter.post('/', async (request, response) => {
    const body = request.body
    if (body.nombre = null) throw Error("Por favor llenar todos los campos")

    const newProduct = {
        nombre: body.nombre,
        descripcion: body.descripcion,
        cantidad: body.cantidad,
        iva: body.iva,
        precio: body.precio,
        id_categoria: body.id_categoria
    }

    const categories = await control.getField(category, id)
    
    function categoryExists(cat) {
        return categories.some(function(el) {
            return el.id == cat;
        })
    }
    if (categoryExists(body.id_categoria) = false) throw Error("La categoría no existe")
    
    const insertedProduct = await control.insert(product, newProduct)
    
    response.json(insertedProduct)
})

module.exports = {
    productsRouter
}