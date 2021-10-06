const facturasRouter = require('express').Router()
const control = require('../controllers/Control')
const Factura = require('../entity/Factura')
const Producto_factura = require('../entity/Producto_factura')


// Devuelve a todas las facturas que hay en la BD, responde a un llamado GET
facturasRouter.get('/', async (request, response) => {
    console.log("Retornar todos")
    const factura = await control.getAll(Factura)
    const producto_factura = await control.getAll(Producto_factura)
    const arrayFactura = [];
    for(var x = 0; x < factura.length; x++){
        for(var y = 0; y < producto_factura.length; y++){
            if(factura[x].id == producto_factura[y].id_factura){
                const newFactura = {
                    id: factura[x].id,
                    costo: factura[x].costo,
                    fecha: factura[x].fecha,
                    id_usuario: factura[x].id_usuario,
                    id_sede: factura[x].id_sede,
                    cantidad: producto_factura[y].cantidad,
                    id_producto: producto_factura[y].id_producto
                }
                arrayFactura.push(newFactura)
            }
        }
        
    }
    response.json(arrayFactura)
})



module.exports = facturasRouter
