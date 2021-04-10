const EntitySchema = require("typeorm").EntitySchema

module.exports = new EntitySchema({
    name: "horario",
    columns: {
        id: {
            primary: true,
            type: "int",
            generated: true
        },
        descripcion: {
            type: "varchar"
        }
    },
    relations: {
        sede: {
            target: "sede",
            type: "one-to-many",
            inverseSide: "hprario"
        }
    }
})