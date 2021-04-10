const EntitySchema = require("typeorm").EntitySchema

module.exports = new EntitySchema({
    name: "Usuarios",
    columns: {
        id: {
            primary: true,
            type: "int",
            generated: true
        },
        activo: {
            type: "boolean",
            default: true
        }
    },
    relations: {
        id_info: {
            target: "Informacion_personal",
            type: "one-to-one",
            joinColumn: {
                name: "Info_id"
            }
        },
        id_rol: {
            target: "roles",
            type: "one-to-one",
            joinColumn: true,
            nulalble:false
        },
        factura: {
            target: "Facturas",
            type: "one-to-many",
            inverseSide: "Usuarios"
        }
    }

})