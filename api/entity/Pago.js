const EntitySchema = require("typeorm").EntitySchema

module.exports = new EntitySchema({
    name: "Pago",
    tableName: "pago",
    columns: {
        id: {
            primary: true,
            type: "int",
            generated: true
        },
        id_factura: {
            type: "int"
        },
        monto: {
            type: "int"
        }
    }
})
