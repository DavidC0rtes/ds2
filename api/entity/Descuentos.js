const EntitySchema = require("typeorm").EntitySchema

module.exports = new EntitySchema({
    name: "descuento",
    columns: {
        id: {
            primary: true,
            type: "int",
            generated: true,
        },
        fecha_inicio: {
            type: "date",
        },
        fecha_fin: {
            type: "date",
        },
        dcto: {
            type: "float"
        },
    },
    relations: {
        id_producto: {
            target: "producto",
            type: "many-to-one",
            nullable: false,
            joinColumn: {
                name: "id_producto"
            }
        }
    }
})
