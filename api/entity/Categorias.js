const EntitySchema = require("typeorm").EntitySchema

module.exports = new EntitySchema({
    name: "Categorias",
    tableName: "categorias",
    columns: {
        id: {
            primary: true,
            type: "int",
            generated: true
        },
        nombre: {
            type: "varchar"
        },
        descripcion: {
            type: "varchar"
        },
        activo: {
            type: "boolean"
        }
    }
})
