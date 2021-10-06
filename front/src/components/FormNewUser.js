import React from 'react'
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


const FormNewUser = (props) => {
  const auth = useAuth() // Hook de autenticación
  const { state } = props

  const classes = useStyles()
  return (
      <form className={classes.form} validate="true" onSubmit={props.handleSubmit}>
        <Grid container spacing={2}>
          <Grid item xs={12} sm={6}>
            <TextField
              error={ state.errorFirstname && true }
              helperText={ state.errorFirstname }
              autoComplete="fname"
              name="firstName"
              variant="outlined"
              required
              fullWidth
              id="firstName"
              label="Primer nombre"
              autoFocus
              onChange={props.handleFieldChange}
              value={state.firstName || ''}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              variant="outlined"
              error={ state.errorLastname && true}
              helperText={state.errorLastname}
              required
              fullWidth
              id="lastName"
              label="Primer apellido"
              name="lastName"
              autoComplete="lname"
              onChange={props.handleFieldChange}
              value={state.lastName || ''}
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              error={state.errorEmail && true}
              helperText={ state.errorEmail }
              variant="outlined"
              required
              fullWidth
              id="email"
              label="Correo electrónico"
              name="email"
              autoComplete="email"
              type="email"
              onChange={props.handleFieldChange}
              value={state.email}
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              error={state.errorPassword && true}
              helperText={state.errorPassword}
              variant="outlined"
              required
              fullWidth
              name="password"
              label="Contraseña"
              type="password"
              id="password"
              autoComplete="current-password"
              onChange={props.handleFieldChange}
              value={state.password}
            />
          </Grid>
          {auth.user && auth.user.rol !== 'Cliente' &&
            <Grid item sm={6}>
              <SimpleSelect
                values={['Cliente', 'Administrador', 'Gerente']}
                errors={state.errorRol}
                handleChange={props.handleFieldChange}
                state={state.rol || ''}
                label='Rol'
                name='rol'
              />
            </Grid>
          }
        </Grid>
        <Button
          type="submit"
          fullWidth
          variant="contained"
          color="primary"
          className={classes.submit}
        >
          Crear cuenta
        </Button>
        <Grid container justify="flex-end">
          <Grid item>
            <Link to="/login">
              ¿Ya tienes una cuenta? Inicia sesión
            </Link>
          </Grid>
        </Grid>
      </form>
    )
}

export default FormNewUser