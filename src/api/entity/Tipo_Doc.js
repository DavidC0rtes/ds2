const EntitySchema = require("typeorm").EntitySchema

module.exports = new EntitySchema({
    name: "Tipo_Documento",
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
