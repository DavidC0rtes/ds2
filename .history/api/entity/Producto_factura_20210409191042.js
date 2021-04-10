const EntitySchema = require("typeorm").EntitySchema

module.exports = new EntitySchema({
    name: "producto_factura",
    columns: {
        id: {
            primary: true,
            type: "int",
            generated:true
        },
        cantidad: {
            type: "int",
            default: 1
        }
    },
    relations: {
        factura: {
            target: "Factura",
            type: "many-to-one",
            nullable: false,
            joinColumn: true
        },
        producto: {
            target: "producto",
            type: "one-to-one",
            joinColumn: true
        }
    }
        
})