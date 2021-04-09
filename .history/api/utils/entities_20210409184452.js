//Este archivo es para importar todas (13) las entidades a app.js e insertar nuevos registros

const categorias = require('../../api/entity/Categorias.js')
const entidad = require ('../../api/entity/Entidad.js')
const factura = require ('../../api/entity/Factura.js')
const horario = require ('../../api/entity/Horarios.js')
const rol = require ('../../api/entity/Id_rol.js')
const infoPersonal = require ('../../api/entity/Informacion_personal.js')
const tarjeta = require ('../../api/entity/Pago_tarjeta.js')
const pago = require ('../../api/entity/Pago.js')
const producto_factura = require ('../../api/entity/Producto_factura.js')
const producto = require ('../../api/entity/Productos.js')
const sedes = require ('../../api/entity/Sedes.js')
const tipoDoc = require ('../../api/entity/Tipo_documento.js')
const usuarios = require ('../../api/entity/Usuarios.js')

const categoria1 =

module.exports = {
    categorias,
    entidad,
    factura,
    horario,
    rol,
    infoPersonal,
    tarjeta,
    pago,
    producto_factura,
    producto,
    sedes,
    tipoDoc,
    usuarios
}