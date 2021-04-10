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
        email: {
            type: "varchar",
            nullable: false
        },
        primer_nombre: {
            type: "varchar",
            nullable: false
        },
        segundo_nombre: {
            type: "varchar"
        },
        primer_apellido: {
            type: "varchar",
            nullable: false
        },
        segundo_apellido: {
            type: "varchar",
            nullable: false
        },
        direccion: {
            type: "varchar"
        },
        password: {
            type: "varchar",
            nullable: false
        },
        birthday: {
            type: "date"
        },
        telefono: {
            type:"varchar"
        },
        num_documento: {
            type: "text",
            nullable: false
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
            nullable:false
            joinColumn: true
        }

    }
})