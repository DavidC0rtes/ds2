import React, { useState } from 'react';
import { Link as RouterLink } from 'react-router-dom';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import Link from '@material-ui/core/Link';
import Grid from '@material-ui/core/Grid';
import Box from '@material-ui/core/Box';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import Copyright from '../../components/Copyright'
import Toast from '../../components/Toast'
import { ErrorOutlineSharp } from '@material-ui/icons';

import loginService from '../../services/login'


const useStyles = makeStyles((theme) => ({
  paper: {
    marginTop: theme.spacing(8),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: '100%', // Fix IE 11 issue.
    marginTop: theme.spacing(1),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
}));

export default function Login() {
  const classes = useStyles();

  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [errors, setErrors] = useState({})
  const [message, setMessage] = useState(null)
  const [user, setUser] = useState(null)

  const doLogin = async (event) => {
    event.preventDefault()

    if (email && password) {
      try {
        const user = await  loginService.login({
          email: email, 
          password: password
        })
        
        // El estado user ahora contiene el correo y el token generado desde el backend
        setUser(user)
        /**
         * Sin embargo lo anterior no es suficiente. Si se le da f5 a la página, la variable
         * user es destruida por React, para hacerlo persistente decidí guardar la información
         * en el navegador. 
         * https://developer.mozilla.org/es/docs/Web/API/Window/localStorage
         */
        window.localStorage.setItem(
          'usuarioLogueado', JSON.stringify(user)
        )
        setEmail('')
        setPassword('')

      } catch(err) {
        console.log(err.response)
        setMessage('Contraseña y/o correo electrónico inválidos')
        setTimeout(() => {
          setMessage(null)
        }, 4000)
      }

    } else {
      const newErrors = {}
      // Añadir mensaje de error solo a campos vacíos
      if (!email) newErrors.email = 'Campo obligatorio'
      if (!password) newErrors.password = 'Campo obligatorio'

      setErrors(newErrors)
    }

  }

  const handleNewEmail = (event) => setEmail(event.target.value)
  const handleNewPassword = (event) => setPassword(event.target.value)


  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <div className={classes.paper}>
        <Avatar className={classes.avatar}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          Iniciar sesión
        </Typography>
        <form className={classes.form} validate="true">
          <TextField
            error={errors.email && true}
            helperText={errors.email}
            variant="outlined"
            margin="normal"
            value={email}
            onChange={handleNewEmail}
            required
            fullWidth
            id="email"
            label="Correo electrónico"
            name="email"
            autoComplete="email"
            autoFocus
          />
          <TextField
            error={errors.password && true}
            helperText={errors.password}
            variant="outlined"
            margin="normal"
            required
            fullWidth
            name="password"
            label="Contraseña"
            type="password"
            id="password"
            autoComplete="current-password"
            value={password}
            onChange={handleNewPassword}
          />
          
          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            className={classes.submit}
            onClick={doLogin}
          >
            Entrar
          </Button>
          <Grid container>
            <Grid item xs>
              <Link href="#" variant="body2">
                Forgot password?
              </Link>
            </Grid>
            <Grid item>
              <Link component={RouterLink} to="/registrarse" href="#" variant="body2">
                {"¿No tienes una cuenta? Registrate"}
              </Link>
            </Grid>
          </Grid>
        </form>
        <Toast 
          message={message}
          vertical='bottom'
          horizontal='center'
        />
      </div>
      <Box mt={8}>
        <Copyright />
      </Box>
    </Container>
  );
}