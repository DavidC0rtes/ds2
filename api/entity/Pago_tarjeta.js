const EntitySchema = require("typeorm").EntitySchema

module.exports = new EntitySchema({
    name: "pago_tarjeta",
    columns: {
        id: {
            primary: true,
            type: "int",
            generated: true
        },
        num_tarjeta: {
            type: "int"
        },
        num_aprobacion: {
            type: "int"
        },
        fecha_aprobacion: {
            type: "timestamp"
        }
    },
    relations: {
        id_pago: {
            target: "Pago",
            type: "one-to-one",
            nullable: false,
            joinColumn: {
                name: "id_pago"
            }
        },
        entidad: {
            target: "Entidad",
            type: "many-to-one",
            nullable: false,
            joinColumn: {
                name: "id_entidad"
            }
        }
    }
       
})