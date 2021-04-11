/**
 * Este es el archivo madre del backend
 * Acá se inicializa todas las cosas sin las que el backend
 * no podría funcionar
 */
const typeorm = require('typeorm')
const tipoDoc = require('./entity/Tipo_documento')
const express = require('express')
const app = express()
const tabla = require('./utils/entities')

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
    //const result = await control.getAll(tipoDoc)

    const result = await control.borrar(tabla.producto, {nombre: "Ala sencilla"})
    console.log(result)
    const todos = await control.getField(tipoDoc, "nombre") 

    console.log(todos)

    const Like = typeorm.Like
    const nombreEmpiezaConC = await typeorm.getRepository(tipoDoc)
        .find({ nombre: Like('C%')})

    console.log(nombreEmpiezaConC)

    const primerRegistro = await typeorm.getRepository(tipoDoc)
        .findOne(1)

    console.log(primerRegistro)

    await conn.close()
    console.log('Conexión terminada')
})()

module.exports = app
