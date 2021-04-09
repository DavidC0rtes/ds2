const EntitySchema = require("typeorm").EntitySchema

module.exports = new EntitySchema({
    name: "Usuario",
    tableName: "usuarios",
    columns: {
        id: {
            primary: true,
            type: "int",
            generated: true
        },
        id_info: {
            type: "int"
        },
        activo: {
            type: "boolean"
        },
        id_rol: {
            type: "int"
        }
    }
})
