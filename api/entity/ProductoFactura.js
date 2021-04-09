const EntitySchema = require("typeorm").EntitySchema

module.exports = new EntitySchema({
    name: "ProductoFactura",
    tableName: "producto_factura",
    columns: {
        id: {
            primary: true,
            type: "int",
            generated: true
        },
        id_factura: {
            type: "int"
        },
        id_producto: {
            type: "int"
        },
        cantidad: {
            type: "int"
        }
    }
})
