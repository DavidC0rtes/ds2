const repository = require('typeorm').getRepository
const control = require('./Control')
const tipoDoc = require('../entity/TipoDoc')


async function getByName(name) {
    const result = await getRepository(tipoDoc)
        .createQueryBuilder(tipoDoc, "tipoDoc")
        .where("tipoDoc.name = :name ", { name: name})
        .getOne
}

async function getById(id) {
    
}
