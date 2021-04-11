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
        },
        password: {
            type: "varchar",
            nullable: false
        },
        email: {
            type: "varchar",
            nullable: false
        }

    },
    relations: {
        id_info: {
            target: "Informacion_personal",
            type: "one-to-one",
            joinColumn: {
                name: "id_info"
            }
        },
        id_rol: {
            target: "roles",
            type: "many-to-one",
            joinColumn: {
                name: "id_rol"
            },
            nullable:false
        },
        factura: {
            target: "Factura",
            type: "one-to-many",
            inverseSide: "Usuarios"
        }
    }

})
