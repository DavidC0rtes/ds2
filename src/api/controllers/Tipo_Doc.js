const tipoDocRepository = require('typeorm').getRepository()
const tipoDoc = require('../entity/Tipo_Doc')

const getAllTypes = async () => {
    const allTypes = await tipoDoc.find()
    return allTypes
} 

module.exports = {
    getAllTypes,
}
