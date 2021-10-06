import React, { useEffect, useState } from "react";

/* Funcion que busca un producto dentro del Carro de compras
    Si el producto se encuentra se devuelve la posicion
    en la que se encuentra dentro de la lista de productos, 
    si no se encuentra se retorna un -1 (pues un indice en un array jamás será negativo
*/

function findProduct(array, name){
    for(var i = 0; i < array.length; i++){
        if(array[i].producto == name){
            return i;
        }
    }
    return -1;
}

// Function para añadir un item al carrito

function addToCart(product, description, price, image){
    var cartArray = JSON.parse(localStorage.getItem("cart"));
    // If cart is null then we have to create a new one to place the item
    if(!cartArray){
        var productSaved2 = {
            'producto': product,
            'descripcion': description,
            'precio': price,
            'cantidad': 1,
            'imagen': image

        }   
        var arrayUsed = [];
        arrayUsed.push(productSaved2);
        localStorage.setItem("cart", JSON.stringify(arrayUsed));
    /* Si el item "cart" del localStorage existe entonces
        procedemos a buscar el nombre del producto que vamos a ingresar
        si existe es por que estamos frente a un caso de agregar producto
        por ende solo se actualiza la cantidad en el carrito, 
        si no encontramos el producto es por que es un producto nuevo
        y agregamos los valores que pasamos en la funcion
    */
    } else { 
        var indexOfProduct = findProduct(cartArray, product);
        if(indexOfProduct != -1){ 
            var productSaved = cartArray[indexOfProduct];
            var setQuantityProduct = {
                'producto': productSaved.producto,
                'descripcion': productSaved.descripcion,
                'precio': productSaved.precio,
                'cantidad': (productSaved.cantidad)+1,
                'imagen': productSaved.imagen
            }
            cartArray[indexOfProduct] = setQuantityProduct;
        } else { 
            var NewProductInList = {
                'producto': product,
                'descripcion': description,
                'precio': price,
                'cantidad': 1,
                'imagen': image
            }   
            cartArray.push(NewProductInList);
        }
        localStorage.setItem("cart", JSON.stringify(cartArray));
    }
}

// Funcion usada para remover un producto del carrito

function removeFromCart(product){
    var cartArray = JSON.parse(localStorage.getItem("cart"));
    var indexOfProduct = findProduct(cartArray, product);
    /*
        Si buscamos el producto y no lo encontramos se retorna un 1 (Parte que 
        nunca deberia suceder)
        si por el contrario encontramos el producto vemos los 2 casos,
        si la cantidad en el carro es mayor a 1 es por que solo queremos eliminar 1
        de la cantidad, si por el contrario la cantidad del producto
        en el carro es de 1, en este caso lo que queremos es remover el producto del carro
    */
    if(indexOfProduct == -1){
        return 1;
    } else {
        if(cartArray[indexOfProduct].cantidad > 1){
            var newProductToStore = {
                'producto': cartArray[indexOfProduct].producto,
                'descripcion': cartArray[indexOfProduct].descripcion,
                'precio': cartArray[indexOfProduct].precio,
                'cantidad': (cartArray[indexOfProduct].cantidad)-1,
                'imagen': cartArray[indexOfProduct].imagen
            }
            cartArray[indexOfProduct] = newProductToStore;
            localStorage.setItem("cart", JSON.stringify(cartArray));
        } else {
            cartArray.splice(indexOfProduct, 1);
            localStorage.setItem("cart", JSON.stringify(cartArray));
            return 0;
        }
    }
}

// Variables para valores iniciales (Usados en los effects)

var printedLocal = [];

// Inicializacion de los valores iniciales (Cart y Price)

function printLocal(){
    var cartArray = JSON.parse(localStorage.getItem("cart"));
    printedLocal = cartArray;
    console.log(printedLocal);
}

function getPrice(){
    var totalPrice = 0;
    var cartArray = JSON.parse(localStorage.getItem("cart"));
    if(cartArray != null && cartArray.length > 0){
        for(var i = 0; i < cartArray.length; i++){
            totalPrice += cartArray[i].precio * cartArray[i].cantidad;
        }
    }
    return totalPrice
    
}

printLocal();

export { addToCart, removeFromCart, printedLocal, getPrice };