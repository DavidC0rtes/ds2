const EntitySchema = require("typeorm").EntitySchema

module.exports = new EntitySchema({
    name: "",
    columns: {
        id: {
            primary: true,
            type: "int",
            generated: true
        },
        monto: {
            type: "int",
            nullable: false
        }
    },
    relations: {
        Factura: {
            target: "Factura",
            type: "many-to-one",
            nullable: false,
            joinColumn: {
                name: "id_factura"
            }
        },
        medio_de_pago: {
            target: "pago_tarjeta",
            type: "one-to-many",
            inverseSide: "Pagos"
        }
    }
    
})