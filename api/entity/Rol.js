const EntitySchema = require("typeorm").EntitySchema

module.exports = new EntitySchema({
    name: "roles",
    columns: {
        id: {
            primary: true,
            type: "int",
            generated: true
        },
        nombre_rol: {
            type: "varchar",
            nullable: false
        }
    },
    relations: {
        usuario: {
            target: "Usuarios",
            type: "one-to-one"
        }
    }
        
})
