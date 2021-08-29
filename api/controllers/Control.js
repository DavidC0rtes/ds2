const typeorm = require('typeorm')
const config = require('../utils/config')

const manager = typeorm.getConnection(config.DBNAME).manager

async function getAll(entity) {
    const result = await manager.find(entity)
    return result
} 

async function insert(entity, data) {
    const result = await manager.insert(entity, data)
    return result
}

// Retorna una columna (field) de una entidad (entity).EJ:
// SELECT primer_nombre FROM usuarios
async function getField(entity, field) {
    const result = await manager
        .createQueryBuilder(entity, "query")
        .select(`query.${field}`)
        .getMany()

    return result
}

/**
 * Actualiza una entidad que cumpla con la condición dada, ej:
 * { firstName: "ejemplo"}
 * Con el contenido del objeto data:
 * { lastName: "apellido" }
 */
async function update(entity, condition, data){
    const result = await manager.update(entity, condition, data)
    return result
}

async function borrar(entity, condition){
    const result = await manager.delete(entity, condition)
    return result
}

// Elimina todos los registros de la entidad
async function deleteAll(entity) {
    const result = await manager.clear(entity)
    return result
}

/* Asemeja una clausula SQL WHERE tipica con una sola condición =.
 *
 * @param entity {String} entidad a consultar
 * @param field {String} campo sobre el cual aplicar la condición
 * @param value {Any} valor del campo. 
 */

async function getBy(entity, field, value) {
    const criteria = {}
    criteria[`${field}`] = value
    
    const result = await manager.find(entity, criteria) // Retorna un arreglo 
    
    return result
}

async function getOneBy(entity, field, value) {
    const criteria = {}
    criteria[`${field}`] = value
    
    const result = await manager.find(entity, criteria) // Retorna un arreglo de un elemento.
    
    return result[0]
}

module.exports = {
    manager,
    getAll,
    insert,
    getField,
    update,
    borrar,
    deleteAll,
    getBy,
    getOneBy
}
