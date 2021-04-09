const EntitySchema = require("typeorm").EntitySchema

module.exports = new EntitySchema({
    name: "Sedes",
    tableName: "sedes",
    columns: {
        id: {
            primary: true,
            type: "int",
            generated: true
        },
        nombre: {
            type: "varchar"
        },
        direccion: {
            type: "varchar"
        },
        id_horario: {
            type: "int"
        }
    }
})
