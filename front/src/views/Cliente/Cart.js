import React, { useEffect, useState } from "react";
import { addToCart, removeFromCart, printedLocal } from '../../hooks/cart.js';
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
    Typography,
    Container,
    Grid,
    CardActionArea,
    CardActions} from '@material-ui/core';


function sumPrice(){
    var totalPrice = 0;
    for(var i = 0; i < printedLocal.length; i++){
        totalPrice += printedLocal[i].precio*printedLocal[i].cantidad;
    }
    document.getElementById("checkout").innerHTML = totalPrice;
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

    controls: {
      display: 'flex',
      alignItems: 'center',
      paddingLeft: theme.spacing(1),
      paddingBottom: theme.spacing(1),
    },
    
    addButton: {
         backgroundColor: '#008CBA',
         border: 'none',
         color: 'white',
         padding: '10px 15 px',
         textAlign: 'center',
         fontSize: '12px',
         marginLeft: '10px'
    },

      AppBarClass: {
        backgroundColor: "#00acc1"
      },

      cardContent: {
        maxWidth: "200px",
        height: "70px"
      },

      cartContent: {
        backgroundColor: "white",
        width: "100%",
        height: "100vh",
        marginTop: "-70px"
      },
      
      btn: {
        backgroundColor: "#09db41",
        '&:hover':{
          backgroundColor: "#16c745"
        }
      },

      btnAdd: {
        color: "white",
        backgroundColor: "#17bae3",
        '&:hover': {
          backgroundColor: "#13a9cf"
        }
      },

      btnRemove: {
        color: "white",
        backgroundColor: "#e03f2d",
        '&:hover': {
          backgroundColor: "#bf3424"
        }
      }
  }));

  export default function CartClient() {
    const classes = useStyles();
    const theme = useTheme();
    if(!printedLocal || printedLocal.length == 0){
      return(
        <Container>
          No hemos encontrado ningun producto, lo sentimos
        </Container>
      );
    } else { 
    return (
      <Container className = {classes.cartContent}>
        <Grid container spacing = {1}>
          {
          printedLocal.map((data, key) => {

            return (
              <Grid item key={key}>
                  <Pedido
                    key={key}
                    product={data.producto}
                    description={data.descripcion}
                    price={data.precio}
                    quantity={data.cantidad}
                    image={data.imagen}
                  />
              </Grid>
            );
          })}

      

        </Grid>
            Precio total: <div id = "checkout">0 </div>
          <Button className = {classes.btn}><Link href = "cart" style={{ color: 'white', textDecoration: 'none' }} > Checkout </Link></Button>
      </Container>
    );
    }
  }

  const Pedido = ({ product, description, price, quantity, image}) => {
    const classes = useStyles();
    const theme = useTheme();
    if (!product) return <div />;
    return (
          <Card >
            <CardActionArea>
              <CardMedia
                component="img"
                height="140"
                image={image}
              />
              <CardContent className = {classes.cardContent}>
                <Typography gutterBottom component="div">
                  {product}
                </Typography>
                <Typography variant="body2">
                  {description}
                </Typography>
              </CardContent>
            </CardActionArea>
            <CardActions>
              <Button size="small" className = {classes.btnAdd} onClick={() => {addToCart(product, description, price, image); sumPrice()}}>
                Aumentar 1
              </Button>
              <Button size = "small" className = {classes.btnRemove} onClick={() => {removeFromCart(product, description, price, image); sumPrice()}}>
                Reducir 1
              </Button>
              <div style = {{ float: 'right' }}>Precio: {price}</div>
              <div style = {{ float: 'right' }}>Cantidad: {quantity}</div>
            </CardActions>
          </Card>
    );
  };