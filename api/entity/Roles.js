const EntitySchema = require("typeorm").EntitySchema

module.exports = new EntitySchema({
    name: "Roles",
    tableName: "roles",
    columns: {
        id: {
            primary: true,
            type: "int",
            generated: true
        },
        nombre_rol: {
            type: "varchar"
        }
    }
})
