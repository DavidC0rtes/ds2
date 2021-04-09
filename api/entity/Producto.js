const EntitySchema = require("typeorm").EntitySchema

module.exports = new EntitySchema({
    name: "Producto",
    tableName: "producto",
    columns: {
        id: {
            primary: true,
            type: "int",
            generated: true
        },
        id_categoria: {
            type: "int"
        },
        nombre: {
            type: "varchar"
        },
        descripcion: {
            type: "varchar"
        },
        cantidad: {
            type: "int"
        },
        iva: {
            type: "int"
        },
        precio: {
            type: "int"
        },
    }
})
