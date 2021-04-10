const EntitySchema = require("typeorm").EntitySchema

module.exports = new EntitySchema({
    name: "categorias",
    columns: {
        id: {
            primary: true,
            type: "int",
            generated: true
        },
        nombre: {
            type: "varchar",
            nullable: false
        },
        descripcion: {
            type: "varchar",
        },
        activo: {
            type: "boolean",
            default: true
        }
    },
    relations: {
        producto: {
            target: "producto",
            type: "one-to-many",
            inverseSide: "categorias"
        },
        sede: {
            target: "sede",
            type: "many-to-many",
            joinTable: {
                name: "categoria_sede",
                joinColumn: {
                    name: "id_categoria"
                },
                inverseJoinColumn: {
                    name: "id_sede"
                },
            },
            inverseSide: "categorias",
            cascade: true
        }
    }
})