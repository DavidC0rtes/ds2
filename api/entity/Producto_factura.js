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
            joinColumn: {
                name: "id_factura"
            },
            onDelete: 'CASCADE'
        },
        producto: {
            target: "producto",
            type: "many-to-one",
            nullable: false,
            joinColumn: {
                name: "id_producto"
            },
            onDelete: 'CASCADE'
        }
    }
})