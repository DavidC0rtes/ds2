const EntitySchema = require("typeorm").EntitySchema

module.exports = new EntitySchema({
    name: "producto",
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
            type: "varchar"
        },
        unidades: {
            type: "int"
        },
        iva: {
            type: "float",
            default: 0.19
        },
        precio: {
            type: "int",
            nullable: false
        }
    },
    relations: {
        factura: {
            target: "producto_factura",
            type: "one-to-one"
        },
        categoria: {                   
            target: "categorias",       
            type: "many-to-one",
            nullable: false,        
            joinColumn: {
                name: "id_categoria"
            }
        }
    }
})
