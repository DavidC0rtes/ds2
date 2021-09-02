import React, { useState } from 'react';
import Avatar from '@material-ui/core/Avatar';
import CssBaseline from '@material-ui/core/CssBaseline';
import FastfoodOutlinedIcon from '@material-ui/icons/FastfoodOutlined';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';

import FormNewUser from '../../components/FormNewUser'
import Toast from '../../components/Toast'
import userService from '../../services/users'
import FormHandler from '../../variables/formHandler'

import { useHistory } from 'react-router-dom'

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
    marginTop: theme.spacing(3),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
}));


export default function SignUp() {
  const [state, setState] = useState({})
  const [message, setNewMessage] = useState(null)

  const history = useHistory()
  
  // Se encarga de añadir un nuevo usuario una vez se dé click al boton 'Registrar'
  const addUser = async (event) => {
    event.preventDefault()
    const _copyState = JSON.parse(JSON.stringify(state))
    
    // Verificar que el formulario este completo.
    if ( state.firstName && state.lastName && state.password && state.email ) {
        const emailInUse = await userService.getByEmail(state.email)

        if (emailInUse) {
            _copyState.errorEmail = 'Correo en uso'
            setState(_copyState)
        } else {
            delete _copyState.errorEmail
            delete _copyState.errorFirstName
            delete _copyState.errorLastName
            delete _copyState.errorPassword

            setState(_copyState)
            // Objeto del usuario cliente a registrar
            const newUser = {
                email: state.email,
                id_rol: 1,
                password: state.password,
                info: {
                    primer_nombre: state.firstName,
                    primer_apellido: state.lastName
                }
            }
            
            try {
                const result = await userService.create(newUser) 
                if (result.identifiers) setNewMessage('¡Te has registrado correctamente!')

                history.replace("/login")
                
            } catch (err) {
                console.error(err)
                setNewMessage('Algo ha salido mal')
            }
            
            setTimeout(() => {
                setNewMessage(null)
            }, 4000)
        }
      
    } else {
        // Añadir mensaje de error solo a campos vacíos
        if (!_copyState.firstName) _copyState.errorFirstname = 'Campo obligatorio'
        if (!_copyState.lastName) _copyState.errorLastName = 'Campo obligatorio'
        if (!_copyState.email) _copyState.errorEmail = 'Campo obligatorio'
        if (!_copyState.password) _copyState.errorPassword = 'Campo obligatorio'

        setState(_copyState)
    }
  }

  const classes = useStyles();

  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <div className={classes.paper}>
        <Avatar className={classes.avatar}>
          <FastfoodOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          Registrarse
        </Typography>
        <FormNewUser
          handleFieldChange={(event) => FormHandler(state, setState, event)}
          state={state}
          handleSubmit={addUser}
        />
        <Toast
            message={message}
            vertical='bottom'
            horizontal='center'
        />
      </div>
    </Container>
  );
}