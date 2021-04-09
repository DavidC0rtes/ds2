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
        hora_apertura: {
            type: "int"
        },
        hora_cierre: {
            type: "int"
        },
        descripcion: {
            type: "varchar"
        }
    }
})
