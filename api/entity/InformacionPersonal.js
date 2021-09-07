const EntitySchema = require("typeorm").EntitySchema

module.exports = new EntitySchema({
    name: "Informacion_personal",
    columns: {
        id: {
            primary: true,
            type: "int",
            generated: true
        }, 
        id_user: {
            type: "int",
            unique: true
        },
        primer_nombre: {
            type: "varchar",
        },
        segundo_nombre: {
            type: "varchar",
            nullable: true
        },
        primer_apellido: {
            type: "varchar",
            nullable: true
        },
        segundo_apellido: {
            type: "varchar",
            nullable: true
        },
        direccion: {
            type: "varchar",
            nullable: true
        },
        birthday: {
            type: "date",
            nullable: true
        },
        telefono: {
            type:"varchar",
            nullable: true
        },
        num_documento: {
            type: "text",
            nullable: true
        }
    },
    relations: {
        usuario: {
            target: "Usuarios",
            type: "one-to-one"
        },
        tipo_documento: {
            target: "Tipo_documento",
            type: "one-to-one",
            joinColumn: true
        }

    }
})
