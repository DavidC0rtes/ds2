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
            type: "varchar",
            nullable: true
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
            type: "varchar",
            nullable: true
        },
        password: {
            type: "varchar",
            nullable: false
        },
        birthday: {
            type: "date",
            nullable: true
        },
        telefono: {
            type:"varchar",
            nullable:true
        },
        num_documento: {
            type: "text",
            nullable: false
        }
    },
    relations: {
        usuario: {
            target: "Usuarios",
            type: "one-to-one",
            onDelete: 'CASCADe'
        },
        tipo_documento: {
            target: "Tipo_documento",
            type: "many-to-one",
            nullable: false,
            joinColumn: {
                name: "tipo_documento"
            }
        }

    }
})