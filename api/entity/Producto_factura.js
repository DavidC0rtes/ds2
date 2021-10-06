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
        id_factura: {
            target: "Factura",
            type: "many-to-one",
            nullable: false,
            joinColumn: {
                name: "id_factura"
            },
            onDelete: 'CASCADE',
            eager: true
        },
        id_producto: {
            target: "producto",
            type: "many-to-one",
            nullable: false,
            joinColumn: {
                name: "id_producto"
            },
            onDelete: 'CASCADE',
            eager: true
        }
    }
})