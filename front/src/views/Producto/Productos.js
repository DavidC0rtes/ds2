import React, { useState } from 'react'
// @material-ui/core components
import { makeStyles } from "@material-ui/core/styles";
import { Redirect } from "react-router-dom";
// core components
import {AppBar, Toolbar, Button} from '@material-ui/core';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import Grid from '@material-ui/core/Grid';
import Accordion from '@material-ui/core/Accordion';
import Container from '@material-ui/core/Container';
import AccordionSummary from '@material-ui/core/AccordionSummary';
import AccordionDetails from '@material-ui/core/AccordionDetails';
import AccordionActions from '@material-ui/core/AccordionActions';
import Typography from "@material-ui/core/Typography";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import Toast from '../../components/Toast'
import AlertDialog from '../../components/Dialog/AlertDialog';
import IconButton from '@material-ui/core/IconButton';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import DeleteForeverIcon from '@material-ui/icons/DeleteForever';

import ModalNewCategory from '../../components/modalNewCategory'
import ModalNewProduct from '../../components/modalNewProduct'
import FormHandler from '../../variables/formHandler'
import CategoryModalHandler from '../../variables/categoryModalHandler'
import ProductModalHandler from '../../variables/productModalHandler'
import ModalEditProduct from '../../components/modalEditProduct'
import ButtonBase from '@material-ui/core/ButtonBase';
import Paper from '@material-ui/core/Paper';

import categoryService from '../../services/categories'
import productService from '../../services/products'

import { addToCart } from '../../hooks/cart.js';

// Sesión del usuario
import { useAuth } from '../../misc/useAuth'


const styles = {
  AppBarClass: {
    marginTop: "-80px",
    backgroundColor: "#00acc1"
  }
};

const useStyles = makeStyles(theme => ({
  root: {
    width: "100%",
  },
  heading: {
    fontSize: theme.typography.pxToRem(20),
    fontWeight: 'bold',
    flexBasis: "33.33%",
    flexShrink: 0,
  },
  paper: {
    padding: theme.spacing(2),
    margin: '1rem auto 1rem',
    maxWidth: 500,
  },
  image: {
    width: 128,
    height: 128,
  },
  img: {
    margin: 'auto',
    display: 'block',
    maxWidth: '100%',
    maxHeight: '100%',
    border: '1px solid gray',
    borderRadius: '6px',
  },
  title: {
    fontWeight: 'bolder',
    paddingTop: '1vh',
  },
  productGrid: {
    border: '1px solid black',
    borderRadius: '8px'
  }

}));



/*obtener todas las categorias
* Usamos esta variable
*/
var categorias = categoryService.getAll().then(function(cats) {categorias = cats})




export default function Categories() {
  const [state, setState] = useState({})
  const [products, setProducts] = useState({})
  const [message, setNewMessage] = useState(null)

  const auth = useAuth()

  //Obtener los productos de una categoria dada
  //Se haca la petición y se cambia el estado.
  const getProducts =  function f1(id){
    productService.getByCat(id).then(function(prods) {setProducts(prods)})
  }
 
  //Añadir categoria
  const addCategory = async (event) => {
    event.preventDefault()
    const _copyState = JSON.parse(JSON.stringify(state)) 
    
    // Verificar que el nombre no este en uso y el campo no este vacio

    if(state.nombre) {
      const nameInUse = await categoryService.getByName(state.nombre)

      if (nameInUse) {
        _copyState.errorNombre = 'Ya existe una categoria con este nombre'
        setState(_copyState)
      } else {
          delete _copyState.errorNombre
          setState(_copyState)

          const newCategory = {
            nombre: state.nombre,
            descripcion: state.descripcion,
            activo: state.activo
          }

          try {
            const result = await categoryService.create(newCategory)
            if (result.identifiers) setNewMessage('Categoria creada')
          } catch (err) {
              console.error(err)
              setNewMessage('Algo ha salido mal')
        }
        setTimeout(() => {
            setNewMessage(null)
        }, 4000)

        }
    } else {
      if (!_copyState.nombre) _copyState.errorNombre = 'Campo obligatorio'
      setState(_copyState)
    }

  }

  //Añadir producto
  const addProduct = async (event) => {
    event.preventDefault()
    const _copyState = JSON.parse(JSON.stringify(state))
    setState(_copyState)
    
    if (state.nombre && state.precio) {
      delete _copyState.errorNombre
      delete _copyState.errorPrecio               
      delete _copyState.errorIva

      setState(_copyState)

      const newProduct ={
        nombre: state.nombre,
        descripcion: state.descripcion,
        cantidad: state.cantidad,
        precio: state.precio,
        iva: (state.iva/100),
        categoria: state.categoria,
      }

      try {
        const result = await productService.create(newProduct)
        if (result.identifiers) setNewMessage('Producto registrado')
      } catch (err){
        console.log(err)
        setNewMessage('Algo ha salido mal')
      }

      setTimeout(() =>  {
        setNewMessage(null)
      }, 4000)

    } else {
      if (!_copyState.nombre) _copyState.errorNombre = 'Campo obligatorio'
      if (!_copyState.precio) _copyState.errorPrecio = 'Campo obligatorio'
      if (!_copyState.iva) _copyState.errorIva = 'Campo obligatorio'
      setState(_copyState)
    }
  }
  const deleteProduct = async (event, id) => {
    event.stopPropagation();
    event.preventDefault();
    const result= await productService.eliminate(id)
    if (result.status === 200) {
			setNewMessage('¡Actualizado con éxito!')
		} else {
			setNewMessage('Ha ocurrido un error')
			console.error(result)
		}
		setTimeout(() => {
			setNewMessage(null)
		}, 5000)
  }

  const classes = useStyles();
  const [expanded, setExpanded] = useState(false);
  const [productExpanded, setProductExpanded] = useState(false);
  
  const handleChange = panel => (event, isExpanded) => {
    if(isExpanded){
      getProducts(panel)
      setExpanded(panel)
    }else{
      setExpanded(false)
    }
       
  };

  function handleCart(nombre, descripcion, precio, imagen){
    if(auth.user){
      addToCart(nombre, descripcion, precio, imagen);
    } else {
      location = '/login'
    }
    console.log("handle");
  }


  const productHandleChange = panel => (event, isExpanded) => {
    var x = document.getElementById("secondheader");
    if (x.style.display === 'none') {
      x.style.display = 'block';
    } else {
      x.style.display = 'none';
    }
    setProductExpanded(isExpanded ? panel : false);
  };
    return (
    <div className={classes.root}>
      <Container maxWidth="md" >
        <Typography  className={classes.title} component="h1" variant="h2" align="left" color="textPrimary" gutterBottom >
          Conoce nuestro menú 🍲
        </Typography>
        <Typography variant="subtitle1" align="left" color="textSecondary" paragraph>
          Disponibilidad puede variar dependiendo de la sede
        </Typography>
      
      {
        auth.user && auth.user.rol == 'Administrador' &&

        
        <ModalNewCategory
        handleFieldChange={(event) => CategoryModalHandler(state, setState, event)}
        state={state}
        handleSubmit={addCategory}/>
      }
           
      {Object.values(categorias).map(accordion => {
        const { id, nombre, descripcion } = accordion;
        return (
          <Accordion
            //TransitionProps={{ unmountOnExit: true }} 
            expanded={expanded === id}
            key={id}
            onChange={handleChange(id)}
          >
            <AccordionSummary
              expandIcon={<ExpandMoreIcon />}
              aria-controls="category_panel1bh-content"
              id="category_panel1bh-header"
            >
              <Typography className={classes.heading} gutterBottom>{nombre}</Typography>
              <Typography className={classes.secondaryHeading}>
                {descripcion} 
              </Typography>
            </AccordionSummary>
            <AccordionDetails style={{display:'block'}}>
              {
                auth.user && auth.user.rol == 'Administrador' &&
                <ModalNewProduct
                handleFieldChange={(event) => ProductModalHandler(state, setState, event, id)}
                state={state}
                handleSubmit={addProduct}  
                />
              }
             
              
            {products ? Object.values(products).map(paper => {
            //Productos lista desplegable
            const { id, nombre, descripcion, cantidad, precio, imagen, iva} = paper;
            return (
            <div className={classes.root} key={id}>
              <Paper className={classes.paper} elevation={9}>
                <Grid container spacing={2}>
                  <Grid item>
                    <ButtonBase className={classes.image}>
                      <img className={classes.img} alt="complex" src={imagen} />
                    </ButtonBase>
                  </Grid>
                  <Grid item xs={12} sm container>
                    <Grid item xs container direction="column" spacing={2}>
                      <Grid item xs >
                        <Typography gutterBottom variant="subtitle1">
                          {nombre}
                        </Typography>
                        <Typography variant="body2" gutterBottom>
                          {descripcion}
                        </Typography>
                        <Typography variant="body2" color="textSecondary">
                          IVA: {iva}%
                        </Typography>
                      </Grid>
                      <Grid item>
                        <Button variant="text" onClick={() => {handleCart(nombre, descripcion, precio, imagen)}} style={{ cursor: 'pointer' }}>
                          Añadir al carrito
                        </Button>         
                      </Grid>
                    </Grid>
                    <Grid item>
                      <Typography variant="subtitle1">${precio}</Typography>
                    </Grid>
                    <Grid item>
                    {auth.user && auth.user.rol == 'Administrador' &&
                    <ModalEditProduct className={classes.column}
                    handleFieldChange={(event) => CategoryModalHandler(state, setState, event)}
                    id={id}
                    state={state}
                    nombre={nombre}
                    descripcion={descripcion}
                    cantidad={cantidad}
                    precio={precio}
                    iva={iva}
                    imagen={imagen}
                    products={products}
                    setProducts={setProducts}
                    />}
                    </Grid>
                    <Grid item>
                    {auth.user && auth.user.rol == 'Administrador' &&
                    <AlertDialog className={classes.column}
                    message="¿Estas seguro? Esta acción no se puede deshacer."
                    agreeTxt="Sí"
                    disagreeTxt="No"
                    btnTxt={'Eliminar'}
                    doAction={(event) =>deleteProduct(event, id)}
              ></AlertDialog>
                        }
                    </Grid>
                    
                  </Grid>
                </Grid>
              </Paper>
            </div>
        );
      }) : <em>Cargando...</em> }
              <Typography width = "100%">
              </Typography>
              
            </AccordionDetails>
          </Accordion>
        );
      })}<Toast
            message={message}
            vertical='bottom'
            horizontal='center'
        />
      </Container>
        <footer className={classes.footer}>
        <Typography variant="h6" align="center" gutterBottom>
          Ordena ya!
        </Typography>
        <Typography variant="subtitle1" align="center" color="textSecondary" component="p">
          Todos los precios están sujetos a posibles modificaciones
        </Typography>
      </footer>
    </div>
  );
}
