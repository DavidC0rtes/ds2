const EntitySchema = require("typeorm").EntitySchema

module.exports = new EntitySchema({
    name: "Tipo_documento",
    columns: {
        id: {
            primary: true,
            type: "int",
            generated: true
        },
        nombre: {
            type: "varchar",
            nullable: false
        }
    },
    relations: {
        info: {
            target: "Informacion_personal",
            type: "one-to-many",
            inverseSide: "Tipo_documento"
        }
    }
})