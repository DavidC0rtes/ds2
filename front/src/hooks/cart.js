import React, { useEffect, useState } from "react";



function findProduct(array, name){
    for(var i = 0; i < array.length; i++){
        if(array[i].producto == name){
            return i;
        }
    }
    return -1;
}

function addToCart(product, description, price, image){
    var cartArray = JSON.parse(localStorage.getItem("cart"));
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

function removeFromCart(product){
    var cartArray = JSON.parse(localStorage.getItem("cart"));
    var indexOfProduct = findProduct(cartArray, product);
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

var printedLocal = [];

function printLocal(){
    var cartArray = JSON.parse(localStorage.getItem("cart"));
    printedLocal = cartArray;
    console.log(printedLocal);
}

printLocal();

export { addToCart, removeFromCart, printedLocal };