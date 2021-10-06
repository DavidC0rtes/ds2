import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import Grid from '@material-ui/core/Grid';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import { makeStyles } from '@material-ui/core/styles';
import { useAuth } from '../misc/useAuth'
import SimpleSelect from './Select'

const useStyles = makeStyles((theme) => ({
    form: {
      width: '100%', // Fix IE 11 issue.
      marginTop: theme.spacing(3),
    },
    submit: {
      margin: theme.spacing(3, 0, 2),
    },
  }));


const FormNewSede = (props) => {
  const auth = useAuth() // Hook de autenticación
  const { state } = props

  const classes = useStyles()
  return (
      <form className={classes.form} validate="true" onSubmit={props.handleSubmit}>
        <Grid container spacing={2}>
          <Grid item xs={12} sm={6}>
            <TextField
              variant="outlined"
              error={ state.errorDireccion && true}
              helperText={state.errorDireccion}
              required
              fullWidth
              id="direccion"
              label="Direccion"
              name="direccion"
              autoComplete="direccion"
              onChange={props.handleFieldChange}
              value={state.direccion}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              variant="outlined"
              error={ state.errorTelefono && true}
              helperText={state.errorTelefono}
              required
              fullWidth
              id="telefono"
              label="Telefono"
              name="telefono"
              autoComplete="telefono"
              onChange={props.handleFieldChange}
              value={state.telefono}
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              error={state.errorHoraApertura && true}
              helperText={state.errorHoraApertura}
              variant="outlined"
              required
              fullWidth
              name="hora_apertura"
              label="Hora de apertura"
              id="hora_apertura"
              autoComplete="hora_apertura"
              onChange={props.handleFieldChange}
              value={state.hora_apertura}
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              error={state.errorHoraCierre && true}
              helperText={state.errorHoraCierre}
              variant="outlined"
              required
              fullWidth
              name="hora_cierre"
              label="Hora del Cierre"
              id="hora_cierre"
              autoComplete="hora_cierre"
              onChange={props.handleFieldChange}
              value={state.hora_cierre}
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              error={state.errorDescripcion && true}
              helperText={state.errorDescripcion}
              variant="outlined"
              required
              fullWidth
              name="descripcion"
              label="Descripcion del Horario"
              id="descripcion"
              autoComplete="descripcion"
              onChange={props.handleFieldChange}
              value={state.descripcion}
            />
          </Grid>
        </Grid>
        <Button
          type="submit"
          fullWidth
          variant="contained"
          color="primary"
          className={classes.submit}
        >
          Crear nueva sede
        </Button>
      </form>
    )
}

export default FormNewSede