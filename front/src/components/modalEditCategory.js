import React, { useState, useEffect } from 'react'
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



  const modalEditCategory = (props) => {
      const { state } = props
      const { open, onClose } = props
      const [checked, setChecked] = useState(true);
      const handleClose = () => {
        //setOpen(false);
        props.handleCloseDialog(false);
      };

      const classes = useStyles()
      console.log(13)
      //Hay diferentes comportamientos si se llama al modal para editar or para crear categorias.
      const editModalSetUp = () => {}

      const editModalBehaviour = () => {
          if (props.edit == true) {
              console.log('lol')
          }

      }

      const setAndCheck = () => {
          setChecked((prev) => !prev);
          props.handleFieldChange(checked)
      }

      const submitAndClose = () => {
          props.handleSubmit;
      };

      return (
          <div>
              <Dialog open={true} onClose={handleClose} aria-labelledby="form-dialog-title">
                  <DialogTitle id="form-dialog-title">Nueva Categoria</DialogTitle>
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
                        {false &&(<Grid component="label" container alignItems="center" spacing={1}>
                        <Grid item>Inactiva</Grid>
                        <Grid item>
                            <Switch checked={checked} onChange={setAndCheck} name="checked"/>
                        </Grid>
                        <Grid item>Activa</Grid>
                      </Grid>)}
                      </Grid>
                      <Button onClick ={onClose} color="primary">
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

  export default modalEditCategory