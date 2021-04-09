const EntitySchema = require("typeorm").EntitySchema

module.exports = new EntitySchema({
    name: "Factura",
    tableName: "factura",
    columns: {
        id: {
            primary: true,
            type: "int",
            generated: true
        },
        id_usuario: {
            type: "int"
        },
        id_sede: {
            type: "int"
        },
        costo: {
            type: "int"
        },
        fecha: {
            type: "varchar"
        }
    }
})
