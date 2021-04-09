/**
 * Este es el archivo madre del backend
 * Acá se inicializa todas las cosas sin las que el backend
 * no podría funcionar
 */
const typeorm = require('typeorm')
const CategoriasEntity = require('./entity/Categorias')
const CategoriasSedeEntity = require('./entity/CategoriasSede')
const EntidadEntity = require('./entity/Entidad')
const FacturaEntity = require('./entity/Factura')
const HorarioEntity = require('./entity/Horario')
const InformacionPersonalEntity = require('./entity/InformacionPersonal')
const PagoEntity = require('./entity/Pago')
const PagoTarjetaEntity = require('./entity/PagoTarjeta')
const ProductoEntity = require('./entity/Producto')
const ProductoFacturaEntity = require('./entity/ProductoFactura')
const RolesEntity = require('./entity/Roles')
const SedesEntity = require('./entity/Sedes')
const TipoDocumentoEntity = require('./entity/TipoDocumento')
const UsuarioEntity = require('./entity/Usuario')
const express = require('express')
const app = express()

// Esta función se ejecuta inmediatamente.
const foo = (async () => {
    // Se crea la conexión 
    const conn = await typeorm.createConnection()
    // Solo después de crear la conexión se puede importar 
    // el control de las entidades
    const control = require('./controllers/Control')
    
    /*
     * Ejemplos del uso de control
     */

    // Traer todos los registros de la entidad tipoDoc
    const result = await control.getAll(TipoDocumentoEntity)
    console.log(result)

    // Insertar registro nuevo
    //const nuevoDoc = {
    //    name: 'Libreta militar'
    //}
    //const insertResult = await control.insert(tipoDoc, nuevoDoc)
    console.log(insertResult)

    
    const todos = await control.getField(tipoDoc, "name") 

    console.log(todos)

    const Like = typeorm.Like
    const nombreEmpiezaConC = await typeorm.getRepository(TipoDocumentoEntity)
        .find({ name: Like('C%')})

    console.log(nombreEmpiezaConC)

    const primerRegistro = await typeorm.getRepository(TipoDocumentoEntity)
        .findOne(1)

    console.log(primerRegistro)

    await conn.close()
    console.log('Conexión terminada')
})()

module.exports = app
