const EntitySchema = require("typeorm").EntitySchema

module.exports = new EntitySchema({
    name: "Factura",
    columns: {
        id: {
            primary: true,
            type: "int",
            generated: true
        },
        costo: {
            type: "int",
            nullable: false
        },
        fecha: {
            type: "timestamp",
            nullable: false
        }
    },
    relations: {
        id_usuario: {
            target: "Usuarios",
            type: "many-to-one",
            joinColumn: {
                name: "id_usuario"
            },
            onDelete: 'SET NULL',
            eager: true
        },
        pago: {
            target: "Pago",
            type: "one-to-many",
            inverseSide: "Factura"
        },
        producto_facturado: {
            target: "producto_factura",
            type: "one-to-many",
            inverseSide: "Factura"
        },
        id_sede: {
            target: "sede",
            type: "many-to-one",
            nullable: false,
            joinColumn: {
                name: "id_sede"
            },
            eager: true,
            
        }

    }
})