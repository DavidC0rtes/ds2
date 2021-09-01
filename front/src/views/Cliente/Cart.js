import React, { useEffect, useState } from "react";
import { PedidoData } from './Data.js';
import { addToCart, removeFromCart, printedLocal } from '../../hooks/Cart/Cart.js';
// @material-ui/core components
import { makeStyles, useTheme } from "@material-ui/core/styles";
// core components
import {
    AppBar, 
    Toolbar, 
    Button, 
    Link, 
    Card,
    CardMedia,
    CardContent, 
    CardActions,
    TextInfoContent,
    Typography,
    Container} from '@material-ui/core';


function sumPrice(){
    var totalPrice = 0;
    for(var i = 0; i < localStorage.length; i++){
        var productSaved = JSON.parse(localStorage.getItem(localStorage.key(i)));
        totalPrice += productSaved.precio*productSaved.cantidad;
    }
    document.getElementById("checkout").innerHTML = "Checkout " + totalPrice;
    console.log(totalPrice);
}

function resPrice(){
    var totalPrice = 0;
    for(var i = 0; i < localStorage.length; i++){
        var productSaved = JSON.parse(localStorage.getItem(localStorage.key(i)));
        totalPrice += productSaved.precio*productSaved.cantidad;
    }
    document.getElementById("checkout").innerHTML = "Checkout " + totalPrice;
    console.log(totalPrice);
}



const useStyles = makeStyles((theme) => ({
    
    details: {
      display: 'flex',
      flexDirection: 'column',
    },

    content: {
      flex: '1 0 auto',
      fontFamily: 'sans-serif',
    },

    cover: {
      width: 200,
    },

    controls: {
      display: 'flex',
      alignItems: 'center',
      paddingLeft: theme.spacing(1),
      paddingBottom: theme.spacing(1),
    },

      cardGeneral: {
          display: 'inline-block',
          backgroundColor: 'white',
          marginTop: '-10px'
      },

      cardPedido:{
        display: 'flex',
        float: 'left',
        marginTop: '1%',
        marginLeft: '1%',
        marginBottom: '1%',
        marginRight: '1%',
        backgroundColor: 'white',
        width: '350px'
      },
    
      contentPedido: {
          color: 'white'
      },
    
      addButton: {
          backgroundColor: '#008CBA',
          border: 'none',
          color: 'white',
          padding: '10px 15 px',
          textAlign: 'center',
          fontSize: '12px'
      },

      AppBarClass: {
        marginTop: "0px",
        backgroundColor: "#00acc1"
      }
  }));

  export default function PedidoClient() {
    const classes = useStyles();
    const theme = useTheme();
    return (
        <React.Fragment>
        <AppBar position="sticky" className = {classes.AppBarClass}>
        <Toolbar>
        <Button color="inherit">Productos y pedido</Button>
        <Button color="inherit"><Link href = "cart" color="primary" style={{ color: 'white', textDecoration: 'none' }} id = "checkout"> Checkout  </Link></Button>
        </Toolbar>
      </AppBar>
      <Toolbar />
        <Container className={classes.cardGeneral}>
            
      <>
        <div className="product-container">
          {
          printedLocal.map((data, key) => {
            return (
              <div key={key}>
                <Pedido
                  key={key}
                  product={data.producto}
                  description={data.descripcion}
                  price={data.precio}
                  quantity={data.cantidad}
                  image={data.imagen}
                />
                
              </div>
            );
          })}
        </div>
        
      </>
      </Container>
      </React.Fragment>
    );
  };

  const Pedido = ({ product, description, price, quantity, image}) => {
    const classes = useStyles();
    const theme = useTheme();
    if (!product) return <div />;
    return (
        <Container>
            <Card className={classes.cardPedido}>
        <div className={classes.details}>
            <CardContent className={classes.content}>
            <Typography component="h5" variant="h5">
                {product}
            </Typography>
            <Typography color="textSecondary">
                {description}
                
            </Typography>
            <Typography >
              Cantidad en el carrito: {quantity}
            </Typography>
            </CardContent>
            <div className={classes.controls}>
                <Button className = {classes.addButton} onClick={() => {addToCart(product, description, price, image); sumPrice();}}> + {price}</Button>
                <Button className = {classes.addButton} onClick={() => {removeFromCart(product, description, price, image); resPrice();}}> - {price}</Button>
            </div>
            </div>
            <CardMedia
                className={classes.cover}
                image={image}
            />
        </Card>
        </Container>
        
    );
  };