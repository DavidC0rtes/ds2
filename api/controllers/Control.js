const typeorm = require('typeorm')

const manager = typeorm.getManager()

async function getAll(entity) {
    const result = await manager.find(entity)
    return result
} 

async function insert(entity, data) {
    const result = await manager.insert(entity, data)
    return result
}

async function getField(entity, field) {
    const result = await manager
        .createQueryBuilder(entity, "query")
        .select(`query.${field}`)
        .getMany()

    return result
}

module.exports = {
    getAll,
    insert,
    getField
}
