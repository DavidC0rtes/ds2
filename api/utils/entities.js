//Este archivo es para importar todas (13) las entidades a app.js e insertar nuevos registros

const categorias = require('../../api/entity/Categorias.js')
const entidad = require ('../../api/entity/Entidad.js')
const factura = require ('../../api/entity/Factura.js')
const horario = require ('../../api/entity/horarios.js')
const roles = require ('../../api/entity/Id_rol.js')
const Informacion_personal = require ('../../api/entity/Informacion_personal.js')
const pago_tarjeta = require ('../../api/entity/Pago_tarjeta.js')
const pago = require ('../../api/entity/Pago.js')
const producto_factura = require ('../../api/entity/Producto_factura.js')
const producto = require ('../../api/entity/Productos.js')
const sede = require ('../../api/entity/Sedes.js')
const Tipo_documento = require ('../../api/entity/Tipo_documento.js')
const usuarios = require ('../../api/entity/Usuarios.js')

const horario1 = {
    hora_apertura: 1800,
    hora_cierre: 2400,
    descripcion: "Horario nocturno básico, de 6PM a 12AM"
}

const sede1 = {
    nombre: "The OG",
    direccion: "Carrera 12 #31-45",
    horario: 2

}

const categoria1 = {
    nombre: "Apanados",
    descripcion: "Productos de pollo apanado con el adobo de la casa",
    activo: false

}

const ala = {
    nombre: "Ala sencilla",
    descripcion: "Ala apanada con porcion de papa",
    precio: 5000,
    categoria: 2
}
const contramuslo = {
    nombre: "Contramuslo",
    descripcion: "Contramuslo apanado con porcion de papa",
    precio: 7000,
    categoria: 2
}

const pernil = {
    nombre: "Pernil",
    descripcion: "pernil apanado con porcion de papa",
    precio: 7000,
    categoria: 2
}

const ala_doble = {
    nombre: "Ala_doble",
    descripcion: "ala doble con papa",
    precio: 7000,
    categoria: 2
}

const factura1 = {   //Factura de un pernil para el señor L. Jackson
    usuario: 13,
    sede: 4,
    costo: 7000 * 1.19,
    fecha: '2016-06-22 19:10:25-07'
}
const factura2 = {  //Contramuslo
    usuario: 10,
    sede: 4,
    costo: 7000 * 1.19,
    fecha: '2021-03-25 22:16:25-10'
}
const factura3 = {  //Todos los demás son alas dobles
    usuario: 15,
    sede: 4,
    costo: 7000 * 1.19,
    fecha: '2021-03-25 22:22:25-12'
}
const factura4 = {
    usuario: 15,
    sede: 4,
    costo: 7000 * 1.19,
    fecha: '2021-03-26 22:00:25-45'
}
const factura5 = {
    usuario: 7,
    sede: 4,
    costo: 7000 * 1.19,
    fecha: '2020-03-26 23:00:25-45'
}

const producto_factura1 = {
    factura: 1,
    producto: 5,
    cantidad: 1
}
const producto_factura2 ={
    factura: 2,
    producto: 4
}
const producto_factura3 ={
    factura: 3,
    producto: 6
}
const producto_factura4 ={
    factura: 4,
    producto: 6
}
const producto_factura5 ={
    factura: 5,
    producto: 6
}

const rol_cliente = {
    id: 0,
    nombre_rol: "Cliente" 
}
const info1 = {
    id_user : 1,
    email: "user1@email.com",
    primer_nombre: "Elias",
    primer_apellido: "L.",
    segundo_apellido: "Jaramillo",
    direccion: "Calle 11# 18-30",
    password: 123,
    num_documento: 123456,
    tipo_documento: 1
}
const info2 = {
    id_user: 2,
    email:"user2@email.com",
    primer_nombre: "Anon",
    primer_apellido: "Y.",
    segundo_apellido: "Mous",
    direccion: "Unknown",
    password: "???",
    num_documento: '000',
    tipo_documento: 1
}
const info3 ={
    id_user: 11,
    email:"user3@email.com",
    primer_nombre: "Samuel",
    primer_apellido: "L.",
    segundo_apellido: "Jackson",
    direccion: "Unknown",
    password: "pulp_fiction",
    num_documento: 13200,
    tipo_documento: 1 
}
const info4 = {
    id_user: 12,
    email: "user4@email.com",
    primer_nombre: "Joseph",
    primer_apellido: " ",
    segundo_apellido: "Joestar",
    direccion: "America",
    password: "Jojo",
    num_documento: '02',
    tipo_documento: 1
}
const user1 = {
    id_info: 3,
    id_rol: 1
}
const user2 ={
    id_info: 7,
    id_rol: 1
}
const user3 = {
    id_info: 9,
    id_rol: 1
}
const user4 = {
    id_info: 10,
    id_rol: 1
}



module.exports = {
    categorias,
    entidad,
    factura,
    horario,
    roles,
    Informacion_personal,
    pago_tarjeta,
    pago,
    producto_factura,
    producto,
    sede,
    Tipo_documento,
    usuarios,
    producto_factura1,
    producto_factura2,
    producto_factura3,
    producto_factura4,
    producto_factura5
}
