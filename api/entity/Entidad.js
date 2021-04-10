const EntitySchema = require("typeorm").EntitySchema

module.exports = new EntitySchema({
    name: "Entidad",
    columns: {
        id: {
            primary: true,
            type: "int",
            generated: true
        },
        nombre: {
            type: "varchar",
            nullable:false
        }
    },
    relations: {
        tarjeta: {
            target: "pago_tarjeta",
            type: "one-to-one"
        }
    }
})