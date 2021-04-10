const EntitySchema = require("typeorm").EntitySchema

module.exports = new EntitySchema({
    name: "Pagos",
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
            joinColumn: true
        },
        medio_de_pago: {
            target: "pago_tarjeta",
            type: "one-to-many",
            inverseSide: "Pagos"
        }
    }
    
})