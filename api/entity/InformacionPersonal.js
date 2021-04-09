const EntitySchema = require("typeorm").EntitySchema

module.exports = new EntitySchema({
    name: "InformacionPersonal",
    tableName: "informacion_personal",
    columns: {
        id: {
            primary: true,
            type: "int",
            generated: true
        },
        id_user: {
            type: "int"
        },
        activo: {
            type: "boolean"
        },
        email: {
            type: "varchar"
        },
        primer_nombre: {
            type: "varchar"
        },
        segundo_nombre: {
            type: "varchar"
        },
        primer_apellido: {
            type: "varchar"
        },
        segundo_apellido: {
            type: "varchar"
        },
        direccion: {
            type: "varchar"
        },
        password: {
            type: "varchar"
        },
        birthday: {
            type: "varchar"
        },
        telefono: {
            type: "varchar"
        },
        num_documento: {
            type: "text"
        },
        tipo_documento: {
            type: "int"
        },
    }
})
