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
            id_sede: factura[x].id_sede,
            cantidad: producto_factura[x].cantidad,
            id_producto: producto_factura[x].id_producto.id,
            id_usuario: factura[x].id_usuario.id
        }
        arrayFactura.push(newFactura)
    }
    response.json(arrayFactura)
})

module.exports = facturasRouter
