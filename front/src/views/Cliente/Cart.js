import React, { useEffect, useState } from "react";
// Hook del carrito
import { addToCart, removeFromCart, printedLocal, totallPrice, getPrice } from '../../hooks/cart.js';
import FacturaService from '../../services/facturas'
import UserService from '../../services/users'
// @material-ui/core components
import { makeStyles, useTheme } from "@material-ui/core/styles";

// Core components
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

    // Definicion de los estilos utilizados para el frontend

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
        maxWidth: "200px"
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

  // Definicion de la funcion main

  export default function CartClient() {

    // Seccion de temas y estilos

    const classes = useStyles();
    const theme = useTheme();

    const cart = localStorage.getItem("cart");
    console.log(cart);

    /* 
      Estados usados por la pagina (printedLocal y totallPrice son referenciados por 
      el hook del carro, ahí se encuentran documentadas las variables)
    */

    const [cartState, setCart] = useState(printedLocal);
    const [priceState, setPrice] = useState(getPrice);

    // Manejador de eventos, casos de cambio de estados

    function handleCartChange(product, description, price, image, opt){
      if(opt == "remove"){
        removeFromCart(product, description, price, image);
        setPrice(priceState - price);
      } else {
        addToCart(product, description, price, image);
        setPrice(priceState + price)
      }
      var cartArray = JSON.parse(localStorage.getItem("cart"));
      setCart(cartArray);
    }

    const  handlerCheckout = async () => {
      var email = JSON.parse(localStorage.getItem("user")).email;
      const usuario = await UserService.getByEmail(email, 'get');
      const newFactura = {
        id_usuario: usuario[0].id,
        costo: priceState,        
      }
      try {
        const result = await FacturaService.create(newFactura)
        var new_array = [];
        localStorage.setItem("cart", JSON.stringify(new_array));
        alert("Factura creada correctamente, el carrito sera eliminado");
      } catch (err) {
        console.log(err)
      }
    }

    /* 
      Render principal, si el carro de compras está vacio
      retorna/muestra una pantalla con un letrero diciendo
      que el carro esta vacio, de lo contrario sencillamente
      renderiza los productos, en todo esto se utiliza el estado y 
      no el carrito como tal pues necesitamos que estas funciones
      se actualicen cada que un producto cambia
      */

    if(!cartState || cartState.length == 0){
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
            // Funcion main para renderizar cada uno de los productos en el carrito
          cartState.map((data, key) => {
            return (
              <Grid item key={key}>
                  <Pedido
                    key={key}
                    product={data.producto}
                    description={data.descripcion}
                    price={data.precio}
                    quantity={data.cantidad}
                    image={data.imagen}
                    handlerOnChange = {handleCartChange}
                  />
              </Grid>
            );
          })}

        </Grid>    
        <p>Precio total: { priceState }</p>
        <Button className = {classes.btn} onClick={() => {handlerCheckout()}}> Checkout </Button>
      </Container>
    );
    }
  }

  // Definicion del componente producto 

  const Pedido = ({ product, description, price, quantity, image, handlerOnChange}) => {
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
                <Typography variant="body2">
                <p>Precio: {price}, Cantidad: {quantity}</p>
                </Typography>
              </CardContent>
            </CardActionArea>
            <CardActions>
              <Button size="small" className = {classes.btnAdd} onClick={() => {handlerOnChange(product, description, price, image, "add")}}>
                +
              </Button>
              <Button size = "small" className = {classes.btnRemove} onClick={() => {handlerOnChange(product, description, price, image, "remove")}}>
                -
              </Button>
            </CardActions>
          </Card>
    );
  };