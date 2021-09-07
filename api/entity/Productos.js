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
        cantidad: {
            type: "int",
            default: 1
        },
        iva: {
            type: "float",
            default: 0.19
        },
        precio: {
            type: "int",
            nullable: false
        },
        imagen: {
            type: "text",
            nullable: true
        }
    },
    relations: {
        factura: {
            target: "producto_factura",
            type: "one-to-many",
            inverseSide: "producto"
        },
        categoria: {                   
            target: "categorias",       
            type: "many-to-one",
            nullable: false,        
            joinColumn: {
                name: "id_categoria"
            },
            eager:true
           
        }
    }
})
