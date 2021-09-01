import React, { useEffect, useState } from "react";

function addToCart(product, description, price, image){
    if(localStorage.getItem(product)){
        var productSaved = JSON.parse(localStorage.getItem(product))
        var newProductToStore = {
            'producto': productSaved.producto,
            'descripcion': productSaved.descripcion,
            'precio': productSaved.precio,
            'cantidad': (productSaved.cantidad)+1,
            'imagen': productSaved.imagen
        }
        localStorage.setItem(product, JSON.stringify(newProductToStore));
    } else {
        var productSaved = {
            'producto': product,
            'descripcion': description,
            'precio': price,
            'cantidad': 1,
            'imagen': image
        }
        localStorage.setItem(product, JSON.stringify(productSaved));
        
    }
    console.log(localStorage);
    
}

function removeFromCart(product){
    var productSaved = JSON.parse(localStorage.getItem(product))
    if(productSaved.cantidad > 1){
        
        var newProductToStore = {
            'producto': productSaved.producto,
            'descripcion': productSaved.descripcion,
            'precio': productSaved.precio,
            'cantidad': (productSaved.cantidad)-1,
            'imagen': productSaved.imagen
        }
        localStorage.setItem(product, JSON.stringify(newProductToStore));
    } else {
        localStorage.removeItem(product);
    }
    console.log(localStorage);
    
}

var printedLocal = [];

function printLocal(){
    for(var i = 0; i < localStorage.length; i++){
        var productSaved = JSON.parse(localStorage.getItem(localStorage.key(i)));
        printedLocal.push(productSaved);
    }
}

printLocal();

export { addToCart, removeFromCart, printedLocal };