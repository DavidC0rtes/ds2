import React from 'react'
import Grid from '@material-ui/core/Grid';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import Link from '@material-ui/core/Link';
import { makeStyles } from '@material-ui/core/styles';

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
    const classes = useStyles()
    return (
        <form className={classes.form} validate="true">
          <Grid container spacing={2}>
            <Grid item xs={12} sm={6}>
              <TextField
                error={ props.errors.firstname  && true }
                helperText={props.errors.firstname }
                autoComplete="fname"
                name="firstName"
                variant="outlined"
                required
                fullWidth
                id="firstName"
                label="Primer nombre"
                autoFocus
                onChange={props.handleNewName}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                variant="outlined"
                error={props.errors.lastname && true}
                helperText={props.errors.lastname}
                required
                fullWidth
                id="lastName"
                label="Primer apellido"
                name="lastName"
                autoComplete="lname"
                onChange={props.handleNewLastName}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                error={props.errors.email && true}
                helperText={ props.errors.email }
                variant="outlined"
                required
                fullWidth
                id="email"
                label="Correo electrónico"
                name="email"
                autoComplete="email"
                onChange={props.handleNewEmail}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                error={props.errors.password && true}
                helperText={props.errors.password}
                variant="outlined"
                required
                fullWidth
                name="password"
                label="Contraseña"
                type="password"
                id="password"
                autoComplete="current-password"
                onChange={props.handleNewPassword}
              />
            </Grid>
          </Grid>
          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            className={classes.submit}
            onClick={props.handleSubmit}
          >
            Crear cuenta
          </Button>
          <Grid container justify="flex-end">
            <Grid item>
              <Link href="#" variant="body2">
                Already have an account? Sign in
              </Link>
            </Grid>
          </Grid>
        </form>
    )
}

export default FormNewUser
