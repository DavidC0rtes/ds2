import React, { useState } from 'react';
import Avatar from '@material-ui/core/Avatar';
import CssBaseline from '@material-ui/core/CssBaseline';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import FastfoodOutlinedIcon from '@material-ui/icons/FastfoodOutlined';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';

import FormNewUser from '../../components/FormNewUser'
import Toast from '../../components/Toast'
import userService from '../../services/users'

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
  const [name, setNewName] = useState('')
  const [lastName, setNewLastName] = useState('')
  const [password, setNewPassword] = useState('')
  const [email, setNewEmail] = useState('')
  const [errors, setNewErrors] = useState({})
  const [message, setNewMessage] = useState(null)

  const history = useHistory()
  
  // Se encarga de añadir un nuevo usuario una vez se dé click al boton 'Registrar'
  const addUser = async (event) => {
    event.preventDefault()
    
    // Verificar que el formulario este completo.
    if ( name && lastName && password && email ) {
        const emailInUse = await userService.getByEmail(email)

        if (emailInUse) {
            const newErrors = {}
            newErrors.email = 'Correo en uso'
            setNewErrors(newErrors)

        } else {
            setNewErrors({})

            // Objeto del usuario cliente a registrar
            const newUser = {
                email: email,
                id_rol: 1,
                password: password,
                info: {
                    primer_nombre: name,
                    primer_apellido: lastName
                }
            }
            
            try {
                const result = await userService.create(newUser) 
                if (result.identifiers) setNewMessage('¡Te has registrado correctamente!')

                history.replace("/login")
                
            } catch (err) {
                setNewMessage('Algo ha salido mal')
            }
            
            setTimeout(() => {
                setNewMessage(null)
            }, 4000)

        }
      
    } else {
        const newErrors = {}
        // Añadir mensaje de error solo a campos vacíos
        if (!name) newErrors.firstname = 'Campo obligatorio'
        if (!lastName) newErrors.lastname = 'Campo obligatorio'
        if (!email) newErrors.email = 'Campo obligatorio'
        if (!password) newErrors.password = 'Campo obligatorio'

        setNewErrors(newErrors)
    }

  }
  
  const handleNewName = (event) => setNewName(event.target.value)
  const handleNewLastName = (event) => setNewLastName(event.target.value)
  const handleNewEmail = (event) => setNewEmail(event.target.value)
  const handleNewPassword = (event) => {
      if (event.target.value.length < 3) {
          const newErrs = JSON.parse(JSON.stringify(errors))
          newErrs.password = 'Contraseña demasiado corta'
          setNewErrors(newErrs)
      } else {
          const newErrs = JSON.parse(JSON.stringify(errors))
          delete newErrs.password
          setNewErrors(newErrs)
          setNewPassword(event.target.value)
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
          handleSubmit={addUser}
          handleNewName={handleNewName}
          handleNewLastName={handleNewLastName}
          handleNewPassword={handleNewPassword}
          handleNewEmail={handleNewEmail}
          errors={errors}
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
