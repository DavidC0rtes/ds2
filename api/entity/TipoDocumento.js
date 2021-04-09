const EntitySchema = require("typeorm").EntitySchema

module.exports = new EntitySchema({
    name: "TipoDocumento",
    tableName: "tipo_documento",
    columns: {
        id: {
            primary: true,
            type: "int",
            generated: true
        },
        name: {
            type: "varchar"
        }
    }
})
