const EntitySchema = require("typeorm").EntitySchema

module.exports = new EntitySchema({
    name: "sede",
    columns: {
        id: {
            primary: true,
            type: "int",
            generated: true
        },
        direccion: {
            type: "varchar"
        }
    },
    relations: {
        categoria: {
            target: "categorias",
            type: "many-to-many",
            joinColumn: {
                name: "id_sede"
            },
        inverseSide: "sede"
        },
        horario: {
            target: "horario",
            type: "many-to-one",
            nullable: false,
            joinColumn: {
                name: "id_horario"
            }
        },
        factura: {
            target: "Factura",
            type: "one-to-many",
            inverseSide: "sede"
        }
   }
})