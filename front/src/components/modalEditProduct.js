import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import Grid from '@material-ui/core/Grid';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import Switch from '@material-ui/core/Switch';
import { makeStyles } from '@material-ui/core/styles';
import Typography from "@material-ui/core/Typography";
import EditIcon from '@material-ui/icons/Edit';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import ProductModalHandler from '../variables/categoryModalHandler'
import productService from '../services/products'


import Toast from './Toast'


const useStyles = makeStyles((theme) => ({
    form: {
      width: '100%', // Fix IE 11 issue.
      marginTop: theme.spacing(3),
    },
    submit: {
      margin: theme.spacing(3, 0, 2),
    },
  }));



  const ModalNewProduct = (props) => {
    let product = {}
    product.id = props.id
    product.nombre = props.nombre
    product.descripcion = props.descripcion
    product.cantidad = props.cantidad
    product.precio = props.precio
    product.iva = props.iva

    const [state, setState] = useState(product)
    const [open, setOpen] = useState(false);
	const [message, setMessage] = useState(null)
    const [checked, setChecked] = useState(true);

 	// Actualizar state cada que el prop cambie.
     useEffect(() => setState(product), [])   
     
     const getState = (key) => {
		if (state) {
			return state[key]
		}
		return ''
	}     
    const handleFieldChange = (event) => ProductModalHandler(state, setState, event) 
    const handleSubmit = async (event) => {
        event.stopPropagation();
        event.preventDefault()
		const toSend = {}
        Object.keys(state).forEach((key) => {
			if (state[key] !== product[key]) 
				toSend[key] = state[key]
		})
        const result = await productService.update(toSend, product.id)
        if (result.status === 200) {
			setMessage('¡Actualizado con éxito!')
		} else {
            setMessage('Ha ocurrido un error')
			console.error(result)
        }
        setTimeout(() => {
			setMessage(null)
		}, 5000)

    }
    
    const classes = useStyles()
    const setAndCheck = () => {
        setChecked((prev) => !prev);
        props.handleFieldChange(checked)
    }
    const handleClickOpen = (event) => {
        event.stopPropagation();
        setOpen(true);
        
    };
    const handleClose = (event) => {
        event.stopPropagation();
        setOpen(false);
    };

      const submitAndClose = () => {
          props.handleSubmit;
          handleClose;
      };

      return (
          <div>
              <IconButton variant="outlined" color="primary"  onClick ={handleClickOpen}>
                <EditIcon/>
              </IconButton>
              <Dialog open={open} onClose={handleClose} aria-labelledby="form-dialog-title">
                  <DialogTitle id="form-dialog-title">Editar Producto</DialogTitle>
                  <DialogContent>
                      <DialogContentText>
                        Editar la información de un producto en la base de datos.
                        El valor IVA para la mayoría de productos es del 19%
                      </DialogContentText>
                      <form className={classes.form} validate="true" onSubmit={handleSubmit}>
                      <Grid container spacing={1}>
                      <Grid item xs={12}>
                          <TextField
                          error ={state.errorNombre && true}
                          helperText={ state.errorNombre}                          
                          name="nombre"
                          variant="outlined"
                          required
                          fullWidth
                          id="nombre"
                          label="Nombre"
                          autoFocus
                          onChange={handleFieldChange}
                          value={getState('nombre')}
                          />
                      </Grid>
                      <Grid item xs={12}>
                          <TextField
                          error ={state.errorDescripcion && true}
                          helperText={ state.errorDescripcion}                              
                          name="descripcion"
                          variant="outlined"
                          fullWidth
                          id="descripcion"
                          label="Descripción"
                          autoFocus
                          onChange={handleFieldChange}
                          value={getState('descripcion')}/>
                      </Grid>
                      <Grid item xs={4}>
                          <TextField                            
                          name="cantidad"
                          variant="outlined"
                          fullWidth
                          id="cantidad"
                          label="Cantidad"
                          autoFocus
                          onChange={handleFieldChange}
                          value={getState('cantidad')}/>
                      </Grid>
                      <Grid item xs={4}>
                          <TextField
                          error ={state.errorPrecio && true}
                          helperText={state.errorPrecio}                               
                          name="precio"
                          variant="outlined"
                          required                          
                          fullWidth
                          id="precio"
                          label="Precio"
                          autoFocus
                          onChange={handleFieldChange}
                          value={getState('precio')}/>
                      </Grid>
                      <Grid item xs={3}>
                          <TextField
                          error ={state.errorIva && true}
                          helperText={state.errorIva}                            
                          name="iva"
                          variant="outlined"
                          required
                          fullWidth
                          id="iva"
                          label="IVA"
                          autoFocus
                          onChange={handleFieldChange}
                          value={getState('iva')}/>
                      </Grid>
                      <Grid item xs={1} >
                          <Typography variant="h4">
                              %
                          </Typography>
                      </Grid>
                      </Grid>
                      <Button onClick ={handleClose} color="primary">
                          Cancelar
                      </Button>
                      <Button  type="submit" onClick={handleSubmit} color ="primary">
                          Crear
                      </Button>
                      </form>
                  </DialogContent>

              </Dialog>
              <Toast
			message={message}
			vertical='bottom'
			horizontal='center'
		/>
          </div>


      )
  }

  export default ModalNewProduct