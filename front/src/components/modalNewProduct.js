import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import Grid from '@material-ui/core/Grid';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import Switch from '@material-ui/core/Switch';
import { makeStyles } from '@material-ui/core/styles';
import SimpleSelect from './Select'
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
  }));



  const modalNewCategory = (props) => {
      const { state } = props
      const [open, setOpen] = useState(false);
      const [checked, setChecked] = useState(true);

      const classes = useStyles()

      const setAndCheck = () => {
          setChecked;
          props.handleFieldChange
      }

      const handleClickOpen = () => {
          setOpen(true);
      };

      const handleClose = () => {
          setOpen(false);
      };

      const submitAndClose = () => {
          props.handleSubmit;
          handleClose;
      };

      return (
          <div>
              <Button variant="outlined" color="primary" fullWidth onClick ={handleClickOpen}>
                  Nueva Categoria
              </Button>
              <Dialog open={open} onClose={handleClose} aria-labelledby="form-dialog-title">
                  <DialogTitle id="form-dialog-title">Nuevo Producto</DialogTitle>
                  <DialogContent>
                      <DialogContentText>
                        *Se puede poner una descripcion aqui*
                      </DialogContentText>
                      <form className={classes.form} validate="true" onSubmit={props.handleSubmit}>
                      <Grid container spacing={2}>
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
                          name="descripcion"
                          variant="outlined"
                          fullWidth
                          id="descripcion"
                          label="Descripción"
                          autoFocus
                          onChange={props.handleFieldChange}
                          value={state.descripcion || ''}/>
                      </Grid>
                      <Grid component="label" container alignItems="center" spacing={1}>
                        <Grid item>Inactiva</Grid>
                        <Grid item>
                            <Switch checked={checked} onChange={setAndCheck} name="checked" value={state.activo} />
                        </Grid>
                        <Grid item>Activa</Grid>
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

  export default modalNewCategory