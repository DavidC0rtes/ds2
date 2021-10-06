import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import Grid from '@material-ui/core/Grid';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import Switch from '@material-ui/core/Switch';
import { makeStyles } from '@material-ui/core/styles';
import SimpleSelect from './Select'
import Typography from "@material-ui/core/Typography";
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';

const useStyles = makeStyles((theme) => ({
    form: {
      width: '100%', // Fix IE 11 issue.
      marginTop: theme.spacing(3),
    },
    submit: {
      margin: theme.spacing(3, 0, 2),
    },
    button: {
        maxWidth: '50%',
        position: 'relative',
        margin: '0 15vw 0',
    }
  }));



  const ModalNewProduct = (props) => {
      const { state } = props
      const [open, setOpen] = useState(false);

      const classes = useStyles()
      const handleClickOpen = () => {
          setOpen(true);
      };

      const handleClose = () => {
          setOpen(false);
      };

      const submitAndClose = () => {
          props.handleSubmit();
          handleClose();
      };

      return (
          <div>
              <Button variant="outlined" color="secondary" className={classes.button} fullWidth onClick ={handleClickOpen}>
                  Nuevo Producto
              </Button>
              <Dialog open={open} onClose={handleClose} aria-labelledby="form-dialog-title">
                  <DialogTitle id="form-dialog-title">Nuevo Producto</DialogTitle>
                  <DialogContent>
                      <DialogContentText>
                        Agregar un nuevo producto a la base de datos, es necesario introducir un nombre, precio e iva
                        El valor IVA para la mayoría de productos es del 19%
                      </DialogContentText>
                      <form className={classes.form} validate="true" onSubmit={props.handleSubmit}>
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
                          onChange={props.handleFieldChange}
                          value={state.nombre || ''}
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
                          onChange={props.handleFieldChange}
                          value={state.descripcion || ''}/>
                      </Grid>
                      <Grid item xs={12}>
                        <TextField
                            name="imagen"
                            variant="outlined"
                            fullWidth
                            id="imagen"
                            autoFocus
                            onChange={props.handleFieldChange}
                            value={state.imagen || ''}
                        />
                      </Grid>
                      <Grid item xs={4}>
                          <TextField                            
                          name="cantidad"
                          variant="outlined"
                          fullWidth
                          id="cantidad"
                          label="Cantidad"
                          autoFocus
                          onChange={props.handleFieldChange}
                          value={state.cantidad || ''}/>
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
                          onChange={props.handleFieldChange}
                          value={state.precio || ''}/>
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
                          onChange={props.handleFieldChange}
                          value={state.iva || ''}/>
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
                      <Button  type="submit" onClick={submitAndClose} color ="primary">
                          Crear
                      </Button>
                      </form>
                  </DialogContent>

              </Dialog>
          </div>


      )
  }

  export default ModalNewProduct
