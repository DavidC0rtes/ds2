const EntitySchema = require("typeorm").EntitySchema

module.exports = new EntitySchema({
    name: "Entidad",
    tableName: "entidad",
    columns: {
        id: {
            primary: true,
            type: "int",
            generated: true
        },
        nombre: {
            type: "varchar"
        }
    }
})
