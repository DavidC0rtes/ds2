import React, { useState } from 'react'
// @material-ui/core components
import { makeStyles } from "@material-ui/core/styles";
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
import ModalNewCategory from '../../components/modalNewCategory'
import ProductAccordion from '../../components/productAccordion'
import FormHandler from '../../variables/formHandler'

import categoryService from '../../services/categories'
import productService from '../../services/products'


const styles = {
  AppBarClass: {
    marginTop: "-80px",
    backgroundColor: "#00acc1"
  }
};

const useStyles = makeStyles(theme => ({
  root: {
    width: "100%"
  },
  heading: {
    fontSize: theme.typography.pxToRem(15),
    flexBasis: "33.33%",

    flexShrink: 0
  },
  secondaryHeading: {
    fontSize: theme.typography.pxToRem(15),
    display: 'inline-block',
    color: theme.palette.text.secondary
  }
}));

/* Añadir un producto y mostrar los productos por categoria TODO
* Se reciben todos los productos, y se los organiza por categoria aqui
* Y los mapeamos a cada acordion
*/


//Eliminar categoria TODO

//Editar categoria TODO

/*obtener todas las categorias
* Usamos esta variable
*/
var categorias = categoryService.getAll().then(function(cats) {categorias = cats})
var productoss = productService.getAll().then(function(rp) {productoss = rp})


const getProductos = function f1(id){
  var productos = productService.getByCat(id).then(function(prods) {productos = prods})
  return productos
}

getProductos(2).then((valor) => console.log(valor) )
console.log(categorias)
export default function Categories() {
  const [state, setState] = useState({})
  const [message, setNewMessage] = useState(null)

  //Obtener los productos de una categoria dada


  
  function getPromise(){
    return new Promise(function(resolve,reject){
      setTimeout(function(){
        resolve({'country' : 'INDIA'});
      },2000)
    })
  }
  
  async function getResult(){
    let result = await getPromise();
    return result
  }
  
  async function doTask(){
    let data = await getResult();
    return data
  }
  doTask();
  console.log(doTask())

 
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
  const classes = useStyles();
  const [expanded, setExpanded] = React.useState(false);

  const handleChange = panel => (event, isExpanded) => {
    setExpanded(isExpanded ? panel : false);
  };
    return (
    <div className={classes.root}>
      <header>"Listado de categorias y productos"</header>
      <ModalNewCategory
        handleFieldChange={(event) => FormHandler(state, setState, event)}
        state={state}
        handleSubmit={addCategory}/>
      {Object.values(categorias).map(accordion => {
        const { id, nombre, descripcion } = accordion;
        return (
          <Accordion
            expanded={expanded === id}
            key={id}
            onChange={handleChange(id)}
          >
            <AccordionSummary
              expandIcon={<ExpandMoreIcon />}
              aria-controls="panel1bh-content"
              id="panel1bh-header"
            >
              <Typography className={classes.heading}>{nombre}</Typography>
              <Typography className={classes.secondaryHeading}>
                {descripcion} 
              </Typography>
            </AccordionSummary>
            <AccordionDetails style={{display:'block'}}>
            {Object.values(productoss).map(accordion => {
        const { id, nombre, descripcion } = accordion;
        return (
          <Accordion
            expanded={expanded === id}
            key={id}
            onChange={handleChange(id)}
          >
            <AccordionSummary
              expandIcon={<ExpandMoreIcon />}
              aria-controls="panel1bh-content"
              id="panel1bh-header"
            >
              <Typography className={classes.heading}>{nombre}</Typography>
              <Typography className={classes.secondaryHeading}>
                {descripcion} 
              </Typography>
            </AccordionSummary>
            <AccordionDetails style={{display:'block'}}>
              <Typography width = "100%">
              </Typography>
              
            </AccordionDetails>
          </Accordion>
        );
      })}
              <Typography width = "100%">
              </Typography>
              
            </AccordionDetails>
          </Accordion>
        );
      })}
    </div>
    
  );
}
