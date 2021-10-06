const EntitySchema = require("typeorm").EntitySchema
module.exports = new EntitySchema({
    name: "producto_cant_sede",
    columns: {
        id: {
            primary: true,
            type: "int",
            generated: true
        },
        cantidad: {
            type: "int",
            default: 100
        },
    },
    relations: {
        id_producto: {
            target: "producto",
            type: "many-to-one",
            joinColumn: {
                name: "id_producto"
            },
        },
        id_sede: {
            target: "sede",
            type: "many-to-one",
            joinColumn: {
                name: "id_sede"
            }
        }
    }
})
