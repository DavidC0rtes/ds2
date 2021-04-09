const EntitySchema = require("typeorm").EntitySchema

module.exports = new EntitySchema({
    name: "CategoriasSede",
    tableName: "categorias_sede",
    columns: {
        id: {
            primary: true,
            type: "int",
            generated: true
        },
        id_sede: {
            type: "int"
        },
        id_categoria: {
            type: "int"
        }
    }
})
