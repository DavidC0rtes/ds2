const typeorm = require('typeorm')
const facturasRouter = require('express').Router()
const control = require('../controllers/Control')
const Factura = require('../entity/Factura')
const Producto_factura = require('../entity/Producto_factura')


// Devuelve a todas las facturas que hay en la BD, responde a un llamado GET
facturasRouter.get('/', async (request, response) => {
    const factura = await control.getAll(Factura)
    const producto_factura = await control.getAll(Producto_factura)
    const arrayFactura = [];
    
    for(var x = 0; x < factura.length; x++){
        const newFactura = {
            id: factura[x].id,
            costo: factura[x].costo,
            fecha: factura[x].fecha,
            id_sede: factura[x].id_sede.id,
            cantidad: producto_factura[x].cantidad,
            id_producto: producto_factura[x].id_producto.id,
            id_usuario: factura[x].id_usuario.id
        }
        arrayFactura.push(newFactura)
    }
    response.json(arrayFactura)
})

/* Creación de facturas, se entiende como una solicitud POST a /api/users,
 * NO existen campos que puedan ser nulos, y la direccion de la sede
 * es unica (No existen 2 sedes con la misma direccion)
 */
facturasRouter.post('/', async (request, response) => {
    const body = request.body

    var today = new Date();
    var dd = String(today.getDate()).padStart(2, '0');
    var mm = String(today.getMonth() + 1).padStart(2, '0');
    var yyyy = today.getFullYear();

    var todayDate = dd + '/' + mm + '/' + yyyy;

    const newFactura = { 
        id_usuario: body.id_usuario,
        costo: body.costo,
        id_sede: 20,
        fecha: todayDate
    }

    const savedFactura = await control.insert(Factura, newFactura)
    console.log(savedFactura);
    response.json(savedFactura)
})


module.exports = facturasRouter
