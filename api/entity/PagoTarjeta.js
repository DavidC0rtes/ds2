const EntitySchema = require("typeorm").EntitySchema

module.exports = new EntitySchema({
    name: "PagoTarjeta",
    tableName: "pago_tarjetas",
    columns: {
        id: {
            primary: true,
            type: "int",
            generated: true
        },
        id_pago: {
            type: "int"
        },
        num_tarjeta: {
            type: "int"
        },
        num_aprobacion: {
            type: "int"
        },
        fecha_aprobacion: {
            type: "varchar"
        },
        id_entidad: {
            type: "int"
        },
    }
})
